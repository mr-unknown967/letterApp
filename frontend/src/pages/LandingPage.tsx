import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import debounce from 'lodash/debounce';

const LandingPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Memoize validation values
  const validNames = useMemo(() => 
    JSON.parse(import.meta.env.VITE_VALID_USERNAMES || '[]').map((name: string) => name.toLowerCase().trim()),
    []
  );
  const expectedDOB = useMemo(() => import.meta.env.VITE_USER_DOB, []);

  // Optimized validation function
  const validateInput = useCallback((name: string, dob: string) => {
    const normalizedName = name.toLowerCase().trim();
    return {
      isValidName: validNames.includes(normalizedName),
      isValidDOB: dob === expectedDOB
    };
  }, [validNames, expectedDOB]);

  useEffect(() => {
    // Start the animations after a small delay
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Debounced validation function with optimized timing
  const debouncedValidation = useCallback(
    debounce(async (name: string, dob: string) => {
      if (!name || !dob) return;
      
      setIsValidating(true);
      try {
        // Quick client-side validation before API call
        const { isValidName, isValidDOB } = validateInput(name, dob);
        
        if (!isValidName || !isValidDOB) {
          const errorMessage = !isValidName && !isValidDOB 
            ? 'Both name and date of birth are incorrect'
            : !isValidName 
              ? 'Name is incorrect'
              : 'Date of birth is incorrect';
          
          setError(errorMessage);
          toast({
            variant: "destructive",
            title: "Validation failed",
            description: errorMessage,
          });
          return;
        }

        const response = await apiRequest('POST', '/api/validate', { name, dob });
        const data = await response.json();
      
        if (data.success) {
          sessionStorage.setItem('userName', name);
          toast({
            title: "Validation successful! ✨",
            description: "Preparing your special message...",
            duration: 2000,
          });
          setShowHearts(true);
          setTimeout(() => {
            navigate('/message');
          }, 1800);
        } else {
          setError(data.message || 'Please check your information and try again.');
          toast({
            variant: "destructive",
            title: "Validation failed",
            description: data.message || 'Please check your information and try again.',
          });
        }
      } catch (error) {
        setError('Something went wrong. Please try again.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      } finally {
        setIsValidating(false);
      }
    }, 300),
    [toast, navigate, validateInput]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await debouncedValidation(name, dob);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced heart confetti component
  const HeartConfetti = () => {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const randomSize = 10 + Math.random() * 20;
          const randomDuration = 0.6 + Math.random() * 1.2;
          const randomDelay = Math.random() * 0.5;
          const randomX = Math.random() * 100;
          const randomRotation = Math.random() * 360;
          
          return (
            <div
              key={i}
              className="absolute bottom-1/3 text-red-600"
              style={{
                left: `${randomX}%`,
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                animation: `confettiExplode ${randomDuration}s ease-out ${randomDelay}s forwards`,
                transform: `rotate(${randomRotation}deg)`,
              }}
            >
              <Heart
                className="w-full h-full"
                style={{
                  animation: `confettiRotate ${randomDuration * 1.2}s ease-in-out ${randomDelay}s infinite`,
                }}
                fill="currentColor"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="heart-bg" />
      
      {/* Show heart confetti when credentials are validated */}
      {showHearts && <HeartConfetti />}
      
      {/* Floating decorative elements */}
      <div className={`absolute top-10 left-1/4 transition-all duration-1000 ${isAnimated ? 'opacity-70 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <Heart className="h-8 w-8 text-pink-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className={`absolute bottom-20 right-1/4 transition-all duration-1000 ${isAnimated ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Heart className="h-6 w-6 text-pink-400 animate-float delay-500" fill="currentColor" />
      </div>
      <div className={`absolute top-1/3 right-20 transition-all duration-1000 ${isAnimated ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Sparkles className="h-5 w-5 text-yellow-400 animate-float" />
      </div>
      
      <div className={`glass-card bg-white/85 backdrop-blur-[4px] p-8 w-full max-w-md relative transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Heart className="h-12 w-12 text-pink-600 animate-float" fill="currentColor" />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2 mt-4">
          <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            A message <br />
            <span className="mt-8 text-center">
              <p className="text-sm text-gray-500 animate-pulse">✨ Something awaits you ✨  
              </p>
            </span>
          </div>
        </h1> <br />
        {/* <p className="text-gray-600 text-center mb-8 animate-shimmer">is waiting for you</p> */}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className={`input-container transition-all duration-700 transform ${
              isAnimated 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="form-input"
              placeholder="HINT: z... k..."
              required
              disabled={isValidating}
            />
            <label htmlFor="name" className="floating-label">Your Name</label>
          </div>
          
          <div 
            className={`input-container transition-all duration-700 transform ${
              isAnimated 
                ? 'opacity-100 translate-y-0 scale-100 delay-150' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setError("");
              }}
              className="form-input"
              placeholder=" "
              required
              disabled={isValidating}
            />
            <label htmlFor="dob" className="floating-label">Date of Birth</label>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center my-2 animate-shake">{error}</div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading || isValidating}
            className={`w-full text-white font-medium py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
              transition-all duration-700 transform shadow-lg hover:shadow-xl 
              ${isAnimated 
                ? 'opacity-100 translate-y-0 scale-100 delay-300' 
                : 'opacity-0 translate-y-8 scale-95'
              }
              hover:scale-[1.02] active:scale-[0.98] hover:shadow-pink-500/25
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading || isValidating ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="loading-spinner" />
                <span>Verifying...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Access Portal</span>
              </span>
            )}
          </button>
        </form>
        <p className={`text-sm mt-4 text-gray-700 italic transition-all duration-1000 delay-[4400ms] ${
        isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          P.S. I'm not sure if this letter will ever reach you, but if it does, I hope you'll take a moment to read it.<br />
            Please keep it to yourself—it was meant only for you.<br />
          If it’s your first login, it might take a moment to load.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
