import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const MessagePage = () => {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Check if user came through the validation process
    const userName = sessionStorage.getItem('userName');
    if (!userName) {
      navigate('/');
      return;
    }
    
    setName(userName);
    
    // Sequentially reveal paragraphs
    let count = 0;
    const revealNextParagraph = () => {
      count += 1;
      setVisibleParagraphs(count);
      
      if (count < paragraphs.length) {
        timerRef.current = setTimeout(revealNextParagraph, 400);
      } else {
        setTimeout(() => setShowButton(true), 400);
      }
    };
    
    // Start the sequence after a short delay
    timerRef.current = setTimeout(revealNextParagraph, 400);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);
  
  const handleNext = async () => {
    const userName = sessionStorage.getItem('userName');
    if (userName) {
      // await trackVisit('message', 'completed', userName);
    }
    navigate('/my-feelings');
  };
  
  // Custom message for Zubiyah
  const paragraphs = [
    <>Dear <span className="font-medium text-primary-700">zubiyah</span>,</>,
    "This is not just a message. It's a feeling that couldn't be kept hidden.",
    "Maybe this is strange, maybe it's sudden... but it's real.",
    "From the one whose heart skips when you smile."
  ];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Corner Hearts - Widely Spaced */}
      <div className="absolute top-12 left-12">
        <Heart className="h-14 w-14 text-red-400 animate-float delay-200" fill="currentColor" />
      </div>
      <div className="absolute top-12 right-12">
        <Heart className="h-14 w-14 text-gray-700 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-12 left-12">
        <Heart className="h-14 w-14 text-red-500 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-12 right-12">
        <Heart className="h-14 w-14 text-gray-800 animate-float delay-800" fill="currentColor" />
      </div>

      {/* Secondary Corner Hearts */}
      <div className="absolute top-24 left-24">
        <Heart className="h-12 w-12 text-red-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute top-24 right-24">
        <Heart className="h-12 w-12 text-gray-600 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-24 left-24">
        <Heart className="h-12 w-12 text-red-500 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-24 right-24">
        <Heart className="h-12 w-12 text-gray-800 animate-float delay-900" fill="currentColor" />
      </div>

      {/* Edge Hearts - Further Apart */}
      <div className="absolute top-1/2 left-8">
        <Heart className="h-10 w-10 text-red-400 animate-float delay-250" fill="currentColor" />
      </div>
      <div className="absolute top-1/2 right-8">
        <Heart className="h-10 w-10 text-gray-600 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-8 left-1/2">
        <Heart className="h-10 w-10 text-red-500 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-8 left-1/2">
        <Heart className="h-10 w-10 text-gray-700 animate-float delay-850" fill="currentColor" />
      </div>
      
      {/* Secondary Edge Hearts */}
      <div className="absolute top-1/2 left-[20%]">
        <Heart className="h-9 w-9 text-red-400 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute top-1/2 right-[20%]">
        <Heart className="h-9 w-9 text-gray-600 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute top-[20%] left-1/2">
        <Heart className="h-9 w-9 text-red-500 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-[20%] left-1/2">
        <Heart className="h-9 w-9 text-gray-700 animate-float delay-950" fill="currentColor" />
      </div>
      
      {/* Quarter Position Hearts */}
      <div className="absolute top-[25%] left-[25%]">
        <Heart className="h-12 w-12 text-red-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute top-[25%] right-[25%]">
        <Heart className="h-12 w-12 text-gray-600 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-[25%] left-[25%]">
        <Heart className="h-12 w-12 text-red-500 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-[25%] right-[25%]">
        <Heart className="h-12 w-12 text-gray-800 animate-float delay-900" fill="currentColor" />
      </div>
      
      {/* Inner Quarter Position Hearts */}
      <div className="absolute top-[35%] left-[35%]">
        <Heart className="h-10 w-10 text-red-400 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute top-[35%] right-[35%]">
        <Heart className="h-10 w-10 text-gray-600 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-[35%] left-[35%]">
        <Heart className="h-10 w-10 text-red-500 animate-float delay-800" fill="currentColor" />
      </div>
      <div className="absolute bottom-[35%] right-[35%]">
        <Heart className="h-10 w-10 text-gray-800 animate-float delay-200" fill="currentColor" />
      </div>
      
      {/* Scattered Medium Hearts */}
      <div className="absolute top-[35%] left-[75%]">
        <Heart className="h-8 w-8 text-red-400 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute top-[65%] right-[75%]">
        <Heart className="h-8 w-8 text-gray-600 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-[35%] left-[75%]">
        <Heart className="h-8 w-8 text-red-500 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-[65%] right-[75%]">
        <Heart className="h-8 w-8 text-gray-800 animate-float delay-950" fill="currentColor" />
      </div>

      {/* Additional Scattered Hearts */}
      <div className="absolute top-[45%] left-[65%]">
        <Heart className="h-7 w-7 text-red-400 animate-float delay-250" fill="currentColor" />
      </div>
      <div className="absolute top-[55%] right-[65%]">
        <Heart className="h-7 w-7 text-gray-600 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute bottom-[45%] left-[65%]">
        <Heart className="h-7 w-7 text-red-500 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-[55%] right-[65%]">
        <Heart className="h-7 w-7 text-gray-800 animate-float delay-850" fill="currentColor" />
      </div>

      {/* Far Edge Small Hearts */}
      <div className="absolute top-[15%] left-[85%]">
        <Heart className="h-6 w-6 text-red-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute top-[85%] right-[15%]">
        <Heart className="h-6 w-6 text-gray-600 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-[15%] left-[85%]">
        <Heart className="h-6 w-6 text-red-500 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-[85%] right-[85%]">
        <Heart className="h-6 w-6 text-gray-800 animate-float delay-900" fill="currentColor" />
      </div>

      {/* Tiny Hearts - Far Corners */}
      <div className="absolute top-[15%] left-[85%]">
        <Heart className="h-4 w-4 text-red-400 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute top-[85%] right-[15%]">
        <Heart className="h-4 w-4 text-gray-600 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-[15%] left-[85%]">
        <Heart className="h-4 w-4 text-red-500 animate-float delay-800" fill="currentColor" />
      </div>
      <div className="absolute bottom-[85%] right-[85%]">
        <Heart className="h-4 w-4 text-gray-800 animate-float delay-200" fill="currentColor" />
      </div>

      {/* Extra Tiny Corner Hearts */}
      <div className="absolute top-[10%] left-[90%]">
        <Heart className="h-3 w-3 text-red-400 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-[90%] right-[10%]">
        <Heart className="h-3 w-3 text-gray-600 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-[10%] left-[90%]">
        <Heart className="h-3 w-3 text-red-500 animate-float delay-850" fill="currentColor" />
      </div>
      <div className="absolute bottom-[90%] right-[90%]">
        <Heart className="h-3 w-3 text-gray-800 animate-float delay-250" fill="currentColor" />
      </div>
      
      <Card className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-xl overflow-hidden relative hover:bg-white/25 transition-all duration-300 ease-in-out">
        <div className="absolute -top-1 -right-1 rotate-45 opacity-60">
          <Heart className="h-16 w-16 text-primary-200" fill="currentColor" />
        </div>
        
        <CardContent className="p-8 relative card-content-wrapper">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="font-dancing text-4xl font-bold text-pink-700 mb-1">A Message From the Heart</h2>
          </div>
          
          <div className="space-y-6 min-h-[220px]">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={`text-primary-600 leading-relaxed transition-all duration-1000 ${
                  index < visibleParagraphs 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-4'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className={`mt-12 text-center transition-all duration-1000 ${
            showButton ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-[#f857a6] to-[#ff5858] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:opacity-90"
            >
              <span>Next</span>
              <span className="ml-2 inline-block transform translate-x-0 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagePage;
