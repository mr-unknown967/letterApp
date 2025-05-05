import express from 'express';
import { saveResponse, getResponses } from './storage.js';
import { ResponseSchema } from './models/Response.js';
import nodemailer from 'nodemailer';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const router = express.Router();
const TRACKING_FILE = join(process.cwd(), 'data', 'tracking.json');

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

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

// Validation route
router.post('/validate', async (req, res) => {
    const { name, dob } = req.body;
  
  // Clean and normalize the submitted name
  const cleanedName = name.toLowerCase().trim().replace(/\s+/g, ' ');
    
  // Get valid names from environment variable
  let validNames: string[] = [];
  try {
    validNames = JSON.parse(process.env.VALID_USERNAMES || '[]');
  } catch (error) {
    console.error('Error parsing VALID_USERNAMES:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server configuration error' 
    });
  }
  
  // Check if the name matches any valid variation
  const isValidName = validNames.some((validName: string) => cleanedName === validName.toLowerCase().trim());
  
  // Get expected DOB from environment variable
  const expectedDOB = process.env.USER_DOB;
  if (!expectedDOB) {
    console.error('USER_DOB environment variable is not set');
    return res.status(500).json({ 
      success: false, 
      message: 'Server configuration error' 
    });
  }
  
  console.log('Environment DOB:', expectedDOB);
  console.log('Submitted DOB:', dob);
  
  const isValidDOB = dob === expectedDOB;
  
  // Log validation attempt for debugging
  console.log('Validation attempt:', {
    originalName: name,
    cleanedName,
    validNames,
    isValidName,
    submittedDOB: dob,
    expectedDOB,
    isValidDOB
  });
  
  if (isValidName && isValidDOB) {
    console.log('Validation successful');
    
    // Send email notification
    try {
      const mailOptions = {
        from: {
          name: 'Letter App Alert',
          address: process.env.EMAIL_USER || ''
        },
        to: process.env.RECEIVER_EMAIL,
        subject: '🔔 New Login Alert',
        text: `🔔 New Login Alert!\n\nName: ${name}\nDOB: ${dob}\nTime: ${new Date().toLocaleString()}`,
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
                  <p style="margin: 10px 0; font-size: 16px;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
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
    
    res.json({ success: true });
  } else {
    const errorMessage = !isValidName && !isValidDOB 
      ? 'Both name and date of birth are incorrect'
      : !isValidName 
        ? 'Name is incorrect'
        : 'Date of birth is incorrect';
    
    console.log('Validation failed:', {
      nameValid: isValidName,
      dobValid: isValidDOB,
      error: errorMessage
    });
    
    res.json({ 
      success: false, 
      message: errorMessage
    });
  }
});

// Submit response route
router.post('/submit', async (req, res) => {
    try {
      // Validate request body
    const validatedData = ResponseSchema.parse(req.body);
      
    // Save to database
    const result = await saveResponse(validatedData);
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // Send email notification
        const mailOptions = {
          from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: 'New Response from Zubiyah',
      text: `💌 New Response from Zubiyah

💭 Message:
${validatedData.additionalInfo}

Received on: ${new Date().toLocaleString()}`
        };
        
          await transporter.sendMail(mailOptions);
      
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