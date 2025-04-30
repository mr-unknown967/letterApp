import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const FloatingHeart = ({ size = 20, color = "text-primary-400", delay = 0, duration = 8, left = "50%" }: {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  left?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`absolute bottom-0 transition-opacity duration-1000 ${isVisible ? 'opacity-70' : 'opacity-0'}`}
      style={{ 
        left, 
        animation: `floatUp ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <Heart 
        className={`h-${size} w-${size} ${color}`} 
        fill="currentColor"
      />
    </div>
  );
};

const ThanksPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Large Hearts */}
      <div className="absolute top-10 left-1/4">
        <Heart className="h-10 w-10 text-red-500 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute bottom-32 right-1/3">
        <Heart className="h-12 w-12 text-gray-800 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-20">
        <Heart className="h-9 w-9 text-red-600 animate-float delay-200" fill="currentColor" />
      </div>
      <div className="absolute top-16 right-1/3">
        <Heart className="h-11 w-11 text-red-400 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute bottom-48 left-1/3">
        <Heart className="h-10 w-10 text-gray-700 animate-float delay-550" fill="currentColor" />
      </div>
      
      {/* Medium Hearts */}
      <div className="absolute top-1/3 right-16">
        <Heart className="h-6 w-6 text-red-400 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/4 left-20">
        <Heart className="h-7 w-7 text-gray-800 animate-float delay-150" fill="currentColor" />
      </div>
      <div className="absolute top-20 right-1/4">
        <Heart className="h-8 w-8 text-red-600 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-1/4">
        <Heart className="h-7 w-7 text-red-500 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute top-1/2 left-16">
        <Heart className="h-8 w-8 text-red-400 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute bottom-60 right-1/4">
        <Heart className="h-7 w-7 text-gray-700 animate-float delay-250" fill="currentColor" />
      </div>
      
      {/* Small Hearts */}
      <div className="absolute top-1/2 right-12">
        <Heart className="h-4 w-4 text-red-500 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute bottom-24 left-16">
        <Heart className="h-3 w-3 text-gray-900 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-28 left-1/3">
        <Heart className="h-4 w-4 text-red-400 animate-float delay-250" fill="currentColor" />
      </div>
      <div className="absolute top-1/3 right-1/4">
        <Heart className="h-4 w-4 text-red-600 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/3 left-32">
        <Heart className="h-3 w-3 text-gray-800 animate-float delay-650" fill="currentColor" />
      </div>
      
      {/* Extra Small Hearts for Detail */}
      <div className="absolute top-40 right-28">
        <Heart className="h-2 w-2 text-red-500 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-48 left-40">
        <Heart className="h-2 w-2 text-gray-800 animate-float delay-800" fill="currentColor" />
      </div>
      <div className="absolute top-60 right-40">
        <Heart className="h-2 w-2 text-red-400 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute bottom-32 right-24">
        <Heart className="h-2 w-2 text-gray-700 animate-float delay-700" fill="currentColor" />
      </div>
      
      {/* Scattered Medium Hearts */}
      <div className="absolute top-3/4 right-1/4">
        <Heart className="h-6 w-6 text-red-600 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute top-1/3 left-1/3">
        <Heart className="h-5 w-5 text-gray-900 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/3 right-36">
        <Heart className="h-8 w-8 text-red-400 animate-float delay-275" fill="currentColor" />
      </div>
      <div className="absolute top-2/3 left-24">
        <Heart className="h-6 w-6 text-red-500 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-2/3 right-28">
        <Heart className="h-7 w-7 text-gray-800 animate-float delay-400" fill="currentColor" />
      </div>
      
      {/* Additional Floating Hearts */}
      <div className="absolute top-1/4 left-1/4">
        <Heart className="h-5 w-5 text-red-400 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/4 right-1/3">
        <Heart className="h-4 w-4 text-gray-700 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute top-3/4 left-36">
        <Heart className="h-6 w-6 text-red-500 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute bottom-2/3 left-1/4">
        <Heart className="h-5 w-5 text-gray-800 animate-float delay-550" fill="currentColor" />
      </div>

      <Card className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-xl overflow-hidden relative hover:bg-white/25 transition-all duration-300 ease-in-out">
        <div className="absolute -top-1 -right-1 rotate-45 opacity-60">
          <Heart className="h-16 w-16 text-red-200" fill="currentColor" />
        </div>
        
        <CardContent className="p-8 text-center relative card-content-wrapper">
          <div className={`mb-8 transition-all duration-500 delay-150 ${
            isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="relative inline-block">
              <Heart className="h-16 w-16 text-red-500 animate-pulse" fill="currentColor" />
              <Heart className="h-16 w-16 text-red-600 absolute top-0 left-0 animate-ping opacity-70" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className={`font-dancing text-4xl font-bold text-pink-700 mb-4 transition-all duration-500 delay-[250ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              Shukriya
            </h2>
            <p className={`text-gray-700 leading-relaxed text-lg transition-all duration-500 delay-[350ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              Aap ka itna waqt dene ke liye.
            </p>
            <p className={`text-gray-700 leading-relaxed font-medium mt-6 text-lg transition-all duration-500 delay-[450ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              From love to you 💌
            </p>
          </div>
          
          <div className={`mt-10 flex justify-center space-x-6 transition-all duration-500 delay-[600ms] ${
            isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <div className="animate-float delay-100">
              <Heart className="h-8 w-8 text-primary-400" fill="currentColor" />
            </div>
            <div className="animate-float delay-300">
              <Heart className="h-10 w-10 text-primary-500" fill="currentColor" />
            </div>
            <div className="animate-float delay-500">
              <Heart className="h-8 w-8 text-primary-600" fill="currentColor" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThanksPage;
