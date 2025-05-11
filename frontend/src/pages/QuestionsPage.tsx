import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, } from "lucide-react";
import { FaSnapchatGhost } from "react-icons/fa";
import { ExternalLink } from "lucide-react"; // Keep this if you're still using Lucide for the link icon


const QuestionsPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    additionalInfo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest('POST', '/api/submit', formData);
      navigate('/thanks');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your responses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="heart-bg"></div>

      {/* Corner Hearts - Extra Wide Spacing */}
      <div className="absolute top-16 left-16">
        <Heart className="h-14 w-14 text-red-400 animate-float delay-200" fill="currentColor" />
      </div>
      <div className="absolute top-16 right-16">
        <Heart className="h-14 w-14 text-gray-700 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-16 left-16">
        <Heart className="h-14 w-14 text-red-500 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-16 right-16">
        <Heart className="h-14 w-14 text-gray-800 animate-float delay-800" fill="currentColor" />
      </div>

      {/* Mid-Edge Hearts - Further Apart */}
      <div className="absolute top-1/2 left-10">
        <Heart className="h-11 w-11 text-red-400 animate-float delay-250" fill="currentColor" />
      </div>
      <div className="absolute top-1/2 right-10">
        <Heart className="h-11 w-11 text-gray-600 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-10 left-1/2">
        <Heart className="h-11 w-11 text-red-500 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-10 left-1/2">
        <Heart className="h-11 w-11 text-gray-700 animate-float delay-850" fill="currentColor" />
      </div>

      {/* Quarter Position Hearts - Wide Spread */}
      <div className="absolute top-[30%] left-[30%]">
        <Heart className="h-12 w-12 text-red-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute top-[30%] right-[30%]">
        <Heart className="h-12 w-12 text-gray-600 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-[30%] left-[30%]">
        <Heart className="h-12 w-12 text-red-500 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-[30%] right-[30%]">
        <Heart className="h-12 w-12 text-gray-800 animate-float delay-900" fill="currentColor" />
      </div>

      {/* Far Edge Hearts */}
      <div className="absolute top-[40%] left-[80%]">
        <Heart className="h-9 w-9 text-red-400 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[80%]">
        <Heart className="h-9 w-9 text-gray-600 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-[40%] left-[80%]">
        <Heart className="h-9 w-9 text-red-500 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-[60%] right-[80%]">
        <Heart className="h-9 w-9 text-gray-800 animate-float delay-950" fill="currentColor" />
      </div>

      {/* Scattered Small Hearts - Far Positions */}
      <div className="absolute top-[20%] left-[90%]">
        <Heart className="h-6 w-6 text-red-400 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute top-[80%] right-[90%]">
        <Heart className="h-6 w-6 text-gray-600 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-[20%] left-[90%]">
        <Heart className="h-6 w-6 text-red-500 animate-float delay-800" fill="currentColor" />
      </div>
      <div className="absolute bottom-[80%] right-[90%]">
        <Heart className="h-6 w-6 text-gray-800 animate-float delay-200" fill="currentColor" />
      </div>

      {/* Tiny Corner Hearts */}
      <div className="absolute top-[10%] left-[95%]">
        <Heart className="h-4 w-4 text-red-400 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-[90%] right-[95%]">
        <Heart className="h-4 w-4 text-gray-600 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-[10%] left-[95%]">
        <Heart className="h-4 w-4 text-red-500 animate-float delay-850" fill="currentColor" />
      </div>
      <div className="absolute bottom-[90%] right-[95%]">
        <Heart className="h-4 w-4 text-gray-800 animate-float delay-250" fill="currentColor" />
      </div>

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
        
        <CardContent className="p-4 sm:p-6 md:p-8 relative card-content-wrapper">
          <div className={`text-center mb-6 md:mb-8 transition-all duration-1000 ${
            isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="relative inline-block mb-4">
              <Heart className="h-16 w-16 text-red-500 animate-pulse" fill="currentColor" />
              <Heart className="h-16 w-16 text-red-600 absolute top-0 left-0 animate-ping opacity-70" />
            </div>
            <h2 className={`font-dancing text-3xl sm:text-4xl font-bold text-pink-700 mb-2 transition-all duration-1000 delay-[200ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Let's Connect</h2>
            {/* <p className={`text-gray-600 text-sm sm:text-base transition-all duration-1000 delay-[400ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>I'd love to get to know you better</p> */}
            <p className={`text-primary-600 font-medium mt-3 md:mt-4 text-sm sm:text-base transition-all duration-1000 delay-[600ms] ${
              isAnimated ? 'opacity-80 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              Agar aapko kuch bhi bolna ya puchna hai bejhi-jak niche likh do.<br />
            </p>
          </div>

            
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className={`input-container transition-all duration-1000 delay-[800ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              
              <Label htmlFor="additionalInfo" className="block mb-2 text-sm sm:text-base font-medium text-gray-800">
              
              </Label>
              <span className="text-red-600 ml-1 font-dancing">*Required</span> {/* This represents "Required" */}
              <Textarea
              
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="form-input text-sm sm:text-base border-2 border-primary-200 focus:border-primary-500 min-h-[100px] bg-pink-50 hover:bg-pink-100 transition-all duration-300"
                placeholder="Feel free to share your thoughts or questions here..."
                rows={3}

              />

              <p className={`mt-4  text-sm sm:text-base italic transition-all duration-1000 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                Aur haa kabhi bhi aapko zarurat ho to, just reach out to me here— I'm always there for you.
              </p>


              <div className={`mt-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-100 transition-all duration-1000 delay-[1000ms] ${
                isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}>
                <p className="text-xs sm:text-sm text-gray-600">
                  <a
                    href="https://www.snapchat.com/add/md.moiz2907?share_id=BaoCvzg1bnY&locale=en-IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <FaSnapchatGhost className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>@md.moiz2907</span>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </p>
              </div>
            </div>

            <div className={`mt-6 sm:mt-8 transition-all duration-1000 delay-[1200ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#f857a6] to-[#ff5858] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionsPage;
