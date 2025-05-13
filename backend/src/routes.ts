import express from 'express';
import { saveResponse, getResponses } from './storage.js';
import { ResponseSchema } from './models/Response.js';
import nodemailer from 'nodemailer';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const router = express.Router();
const TRACKING_FILE = join(process.cwd(), 'data', 'tracking.json');

// Parse environment variables once at startup
const validNames = new Set(JSON.parse(process.env.VALID_USERNAMES || '[]').map((name: string) => name.toLowerCase().trim()));
const expectedDOB = process.env.USER_DOB || '';

if (!expectedDOB) {
  console.error('USER_DOB environment variable is not set');
  process.exit(1);
}

// Enhanced cache with better memory management and faster lookups
class EnhancedCache {
  private cache: Map<string, { value: any; expiry: number }>;
  private ttl: number;
  private maxSize: number;
  private cleanupInterval: NodeJS.Timeout;

  constructor(ttlSeconds: number, maxSize: number) {
    this.cache = new Map();
    this.ttl = ttlSeconds * 1000;
    this.maxSize = maxSize;
    
    // Periodic cleanup to prevent memory leaks
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Cleanup every minute
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expiry) {
        this.cache.delete(key);
      }
    }
  }

  set(key: string, value: any): void {
    // If cache is full, remove oldest entries
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.clear();
  }
}

// Initialize validation cache with 5 minute TTL and max 1000 entries
const validationCache = new EnhancedCache(300, 1000);

// Simple rate limiter
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }>;
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.requests = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isRateLimited(ip: string): boolean {
    const now = Date.now();
    const request = this.requests.get(ip);

    if (!request) {
      this.requests.set(ip, { count: 1, resetTime: now + this.windowMs });
      return false;
    }

    if (now > request.resetTime) {
      this.requests.set(ip, { count: 1, resetTime: now + this.windowMs });
      return false;
    }

    if (request.count >= this.maxRequests) {
      return true;
    }

    request.count++;
    return false;
  }
}

// Initialize rate limiter (5 requests per 15 minutes)
const validationLimiter = new RateLimiter(15 * 60 * 1000, 5);

// Rate limiting middleware
const rateLimitMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (validationLimiter.isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many validation attempts, please try again later' });
  }
  next();
};

interface TrackingData {
  id: string;
  sessionId?: string;
  page: string;
  timestamp: string;
  action?: string;
  name?: string;
  progression?: {
    landing?: boolean;
    message?: boolean;
    myFeelings?: boolean;
    questions?: boolean;
    thanks?: boolean;
    lastPage: string;
  };
}

// Configure nodemailer with optimized settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  maxConnections: 10,
  maxMessages: 100,
  rateDelta: 1000, // Minimum time between messages
  rateLimit: 5, // Max messages per rateDelta
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Skip certificate validation for faster connection
  }
});

// Cache for email sending status
const emailCache = new Map<string, { status: 'success' | 'error', timestamp: number }>();
const EMAIL_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Optimized email sending function
async function sendEmail(mailOptions: any) {
  const cacheKey = JSON.stringify(mailOptions);
  const cachedResult = emailCache.get(cacheKey);
  
  if (cachedResult && Date.now() - cachedResult.timestamp < EMAIL_CACHE_TTL) {
    return cachedResult.status === 'success';
  }

  try {
    await transporter.sendMail(mailOptions);
    emailCache.set(cacheKey, { status: 'success', timestamp: Date.now() });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    emailCache.set(cacheKey, { status: 'error', timestamp: Date.now() });
    return false;
  }
}

// Track visits route
router.get('/track', async (req, res) => {
  try {
    let trackingData: TrackingData[] = [];
    try {
      const data = await readFile(TRACKING_FILE, 'utf8');
      trackingData = JSON.parse(data);
      
      // Ensure all entries have IDs
      trackingData = trackingData.map(entry => ({
        ...entry,
        id: entry.id || Date.now().toString()
      }));
      
    } catch (error) {
      // File doesn't exist yet, return empty array
    }
    
    // Sort by timestamp in descending order (most recent first)
    trackingData.sort((a: TrackingData, b: TrackingData) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    res.json(trackingData);
  } catch (error) {
    console.error('Error reading tracking data:', error);
    res.status(500).json({ message: 'Failed to read tracking data' });
  }
});

router.post('/track', async (req, res) => {
  try {
    const visitData = req.body as TrackingData;
    
    if (!visitData.id) {
      visitData.id = Date.now().toString();
    }
    
    // Read existing tracking data
    let trackingData: TrackingData[] = [];
    try {
      const data = await readFile(TRACKING_FILE, 'utf8');
      trackingData = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }
    
    // Add new visit data
    trackingData.push(visitData);
    
    // Save updated tracking data
    await writeFile(TRACKING_FILE, JSON.stringify(trackingData, null, 2));
    
    res.json({ success: true, data: visitData });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ message: 'Failed to track visit' });
  }
});

router.delete('/track', async (req, res) => {
  try {
    // Write an empty array to the tracking file
    await writeFile(TRACKING_FILE, JSON.stringify([], null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting all tracking data:', error);
    res.status(500).json({ message: 'Failed to delete all tracking data' });
  }
});

router.delete('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'No ID provided' });
    }
    
    // Read existing tracking data
    let trackingData: TrackingData[] = [];
    try {
      const data = await readFile(TRACKING_FILE, 'utf8');
      trackingData = JSON.parse(data);
    } catch (error) {
      return res.status(404).json({ message: 'No tracking data found' });
    }
    
    // Check if the entry exists
    const entryExists = trackingData.some(entry => entry.id === id);
    if (!entryExists) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    // Filter out the entry with the given ID
    const filteredData = trackingData.filter(entry => entry.id !== id);
    
    // Save updated tracking data
    await writeFile(TRACKING_FILE, JSON.stringify(filteredData, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting tracking entry:', error);
    res.status(500).json({ message: 'Failed to delete tracking entry' });
  }
});

// Update tracking entry
router.put('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData: TrackingData = req.body;
    
    // Read existing tracking data
    let trackingData: TrackingData[] = [];
    try {
      const data = await readFile(TRACKING_FILE, 'utf8');
      trackingData = JSON.parse(data);
    } catch (error) {
      return res.status(404).json({ message: 'No tracking data found' });
    }
    
    // Find and update the entry
    const index = trackingData.findIndex(entry => entry.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    trackingData[index] = updatedData;
    
    // Save updated tracking data
    await writeFile(TRACKING_FILE, JSON.stringify(trackingData, null, 2));
    
    res.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error updating tracking entry:', error);
    res.status(500).json({ message: 'Failed to update tracking entry' });
  }
});

// Helper function to get IST timestamp
function getISTTimestamp() {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });
}

// Async function to send email
async function sendLoginNotification(name: string, dob: string) {
  try {
    const mailOptions = {
      from: {
        name: 'Letter App Alert',
        address: process.env.EMAIL_USER || ''
      },
      to: process.env.RECEIVER_EMAIL,
      subject: '🔔 New Login Alert',
      text: `🔔 New Login Alert!\n\nName: ${name}\nDOB: ${dob}\nTime (IST): ${getISTTimestamp()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Login Alert</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px;">
              <h1 style="color: #e91e63; margin-bottom: 20px; text-align: center;">🔔 New Login Alert</h1>
              <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="margin: 10px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>DOB:</strong> ${dob}</p>
                <p style="margin: 10px 0; font-size: 16px;"><strong>Time (IST):</strong> ${getISTTimestamp()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Notification-Type': 'login_alert',
        'X-Auto-Response-Suppress': 'OOF, AutoReply',
        'Precedence': 'bulk',
        'X-Entity-Ref-ID': Date.now().toString()
      },
      priority: 'high' as const
    };

    await transporter.sendMail(mailOptions);
    console.log('Login notification email sent successfully');
  } catch (error) {
    console.error('Error sending login notification email:', error);
    // Don't fail the login if email fails
  }
}

// Validation route with optimizations
router.post('/validate', rateLimitMiddleware, async (req, res) => {
  try {
    const { name, dob } = req.body;
    
    // Generate cache key (normalized)
    const cacheKey = `${name.toLowerCase().trim()}_${dob}`;
    
    // Check cache first
    const cachedResult = validationCache.get(cacheKey);
    if (cachedResult) {
      return res.json(cachedResult);
    }
  
    // Quick validation using Set for O(1) lookup
    const isValidName = validNames.has(name.toLowerCase().trim());
    const isValidDOB = dob === expectedDOB;
    
    // Prepare response
    const response = isValidName && isValidDOB
      ? { success: true }
      : { 
          success: false, 
          message: !isValidName && !isValidDOB 
            ? 'Both name and date of birth are incorrect'
            : !isValidName 
              ? 'Name is incorrect'
              : 'Date of birth is incorrect'
        };
    
    // Cache the result
    validationCache.set(cacheKey, response);
    
    // Send email notification asynchronously if validation successful
    if (isValidName && isValidDOB) {
      // Fire and forget email notification without awaiting
      sendLoginNotification(name, dob).catch(console.error);
    }
    
    res.json(response);
  } catch (error) {
    console.error('Error in validation route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Submit response route with optimized email handling
router.post('/submit', async (req, res) => {
  try {
    // Validate request body
    const validatedData = ResponseSchema.parse(req.body);
      
    // Save to database
    const result = await saveResponse(validatedData);
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // Prepare email options
    const mailOptions = {
      from: {
        name: 'Letter App',
        address: process.env.EMAIL_USER || ''
      },
      to: process.env.RECEIVER_EMAIL,
      subject: 'New Response from Zubiyah',
      text: `💌 New Response from Zubiyah\n\n💭 Message:\n${validatedData.additionalInfo}\n\nReceived on (IST): ${getISTTimestamp()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63;">💌 New Response from Zubiyah</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0;">${validatedData.additionalInfo}</p>
          </div>
          <p style="color: #666; font-size: 14px;">Received on (IST): ${getISTTimestamp()}</p>
        </div>
      `,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    // Send email asynchronously without awaiting
    sendEmail(mailOptions).catch(console.error);
    
    // Respond immediately without waiting for email
    res.json({ success: true, message: 'Response submitted successfully' });
  } catch (error) {
    console.error('Error in submit route:', error);
    res.status(400).json({ 
      error: error instanceof Error ? error.message : 'Invalid request data'
    });
  }
});

// Get responses route
router.get('/responses', async (req, res) => {
  try {
    const result = await getResponses();
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    res.json(result.data);
  } catch (error) {
    console.error('Error in get responses route:', error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

export default router;