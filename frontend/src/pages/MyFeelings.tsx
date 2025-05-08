import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const MyFeelings = () => {
  const [, navigate] = useLocation();
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true); 
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Far Corner Hearts */}
      <div className="absolute top-8 left-8">
        <Heart className="h-16 w-16 text-red-400 animate-float delay-200" fill="currentColor" />
      </div>
      <div className="absolute top-8 right-8">
        <Heart className="h-16 w-16 text-gray-700 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-8 left-8">
        <Heart className="h-16 w-16 text-red-500 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute bottom-8 right-8">
        <Heart className="h-16 w-16 text-gray-800 animate-float delay-800" fill="currentColor" />
      </div>

      {/* Outer Ring Large Hearts */}
      <div className="absolute top-[10%] left-[20%]">
        <Heart className="h-14 w-14 text-red-600 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute top-[10%] right-[20%]">
        <Heart className="h-14 w-14 text-gray-600 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-[10%] left-[20%]">
        <Heart className="h-14 w-14 text-red-400 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-[10%] right-[20%]">
        <Heart className="h-14 w-14 text-gray-700 animate-float delay-250" fill="currentColor" />
      </div>

      {/* Mid Ring Hearts */}
      <div className="absolute top-[30%] left-[15%]">
        <Heart className="h-12 w-12 text-red-500 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-[30%] right-[15%]">
        <Heart className="h-12 w-12 text-gray-800 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-[30%] left-[15%]">
        <Heart className="h-12 w-12 text-red-400 animate-float delay-850" fill="currentColor" />
      </div>
      <div className="absolute bottom-[30%] right-[15%]">
        <Heart className="h-12 w-12 text-gray-600 animate-float delay-150" fill="currentColor" />
      </div>

      {/* Inner Ring Hearts */}
      <div className="absolute top-[45%] left-[25%]">
        <Heart className="h-10 w-10 text-red-600 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute top-[45%] right-[25%]">
        <Heart className="h-10 w-10 text-gray-700 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-[45%] left-[25%]">
        <Heart className="h-10 w-10 text-red-400 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-[45%] right-[25%]">
        <Heart className="h-10 w-10 text-gray-800 animate-float delay-900" fill="currentColor" />
      </div>

      {/* Center Area Hearts */}
      <div className="absolute top-[40%] left-[40%]">
        <Heart className="h-8 w-8 text-red-500 animate-float delay-250" fill="currentColor" />
      </div>
      <div className="absolute top-[60%] right-[40%]">
        <Heart className="h-8 w-8 text-gray-600 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute bottom-[40%] left-[60%]">
        <Heart className="h-8 w-8 text-red-400 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-[60%] right-[60%]">
        <Heart className="h-8 w-8 text-gray-700 animate-float delay-850" fill="currentColor" />
      </div>

      {/* Additional Mid Points */}
      <div className="absolute top-[20%] left-[35%]">
        <Heart className="h-9 w-9 text-red-400 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute top-[35%] right-[45%]">
        <Heart className="h-9 w-9 text-gray-600 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-[20%] left-[45%]">
        <Heart className="h-9 w-9 text-red-500 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-[35%] right-[35%]">
        <Heart className="h-9 w-9 text-gray-800 animate-float delay-950" fill="currentColor" />
      </div>

      {/* Far Edge Hearts */}
      <div className="absolute top-[50%] left-[5%]">
        <Heart className="h-11 w-11 text-red-400 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute top-[50%] right-[5%]">
        <Heart className="h-11 w-11 text-gray-700 animate-float delay-600" fill="currentColor" />
      </div>
      <div className="absolute top-[5%] left-[50%]">
        <Heart className="h-11 w-11 text-red-500 animate-float delay-800" fill="currentColor" />
      </div>
      <div className="absolute bottom-[5%] right-[50%]">
        <Heart className="h-11 w-11 text-gray-600 animate-float delay-200" fill="currentColor" />
      </div>

      {/* Scattered Small Hearts */}
      <div className="absolute top-[15%] left-[75%]">
        <Heart className="h-5 w-5 text-red-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute top-[75%] right-[15%]">
        <Heart className="h-5 w-5 text-gray-600 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute bottom-[15%] left-[65%]">
        <Heart className="h-5 w-5 text-red-500 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-[75%] right-[65%]">
        <Heart className="h-5 w-5 text-gray-800 animate-float delay-900" fill="currentColor" />
      </div>

      {/* Extra Tiny Hearts */}
      <div className="absolute top-[85%] left-[85%]">
        <Heart className="h-3 w-3 text-red-400 animate-float delay-250" fill="currentColor" />
      </div>
      <div className="absolute top-[85%] right-[85%]">
        <Heart className="h-3 w-3 text-gray-600 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute bottom-[85%] left-[85%]">
        <Heart className="h-3 w-3 text-red-500 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute bottom-[85%] right-[85%]">
        <Heart className="h-3 w-3 text-gray-800 animate-float delay-850" fill="currentColor" />
      </div>
     
      <Card className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-xl overflow-hidden relative hover:bg-white/25 transition-all duration-300 ease-in-out">
        <div className="absolute -top-1 -right-1 rotate-45 opacity-60">
          <Heart className="h-16 w-16 text-primary-200" fill="currentColor" />
        </div>
        
        <CardContent className="p-4 sm:p-5 md:p-6 relative card-content-wrapper">
          <div className="text-center mb-4 md:mb-5 animate-fade-in">
            <h2 className="font-dancing text-4xl sm:text-6xl font-semibold text-pink-700 mb-2">My Feelings</h2>
          </div>
          
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none space-y-3 sm:space-y-4 min-h-[220px]">
            <p className={`text-gray-800 font-medium font-semibold mb-3 md:mb-4 transition-all duration-1000 ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Dear Zubiyah,</p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[200ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>I've wanted to tell you something for a very long time, but never found the right moment. kabhi baat adhuri reh jati thi to, kabhi baat hi shuru nahi hoti thi... jo dil me hai Woh bol nahi saka, to soncha ki thoda alag andaz me bolon. Here it is…</p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[400ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>"Aap ki muskurahat, aap ki aawaz, aap ki woh brown Aankhen, aap ka lehja, aur Woh nazakat –  bas mai fidaa hogaya.
            Jabhi bhi aapko dekhta hoon, meri puri duniya rukh jati hai aur bas aap hi nazar aati hoo, Dhadkane teez hojati hai.</p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[600ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Pehli nazar mein hi  app se mohabbat ho gayi <br className="hidden sm:block"/>
            Aaj bhi yaad hai Woh din jab mai aapko paheli baar dekha tha...(I think that was your first day in the college)</p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[800ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Aur phir dusri dafa 13th October ka fest(Navratri Naveli) ke din, that day I talked to you for the very first time (shayad aapko yaad nahi hai). <br className="hidden sm:block"/>
            waise to aap har din khoobsurat dikhte magar, usdin kuch zyada hi khoobsurat dikhre the...(usdin ye compliment nai desaka, coz you were in a hurry)</p>

            <p className={`mb-3 md:mb-4 leading-relaxed font-semibold transition-all duration-1000 delay-[1000ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Annual day ke din aapko dekh ke kuch lines likha.. <br className="hidden sm:block"/>
            "Arz kiya hai... <br className="hidden sm:block"/>
             Woh chaand bhi sharma gaya khubsurti tumhaari dekh kar, <br className="hidden sm:block"/>
             Sitaare bhi pheeke pad gaye aankhon ki chamak tumhaari dekh kar, <br className="hidden sm:block"/>
             Kya kahoon tumhe... lafz khud kho jaate hai, <br className="hidden sm:block"/>
             Jab tum yun haseen nazar aate ho, saansein tham jaati hai"</p>


            <p className={`mb-3 md:mb-4 leading-relaxed font-semibold transition-all duration-1000 delay-[1200ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              "Arz kiya hai.. <br className="hidden sm:block"/>
              Ye sitare tumhari ankho ke, ye chand thumri zameen par,<br className="hidden sm:block"/>
              Ye sitare tumhari ankho ke, ye chand tumhari zameen par,<br className="hidden sm:block"/>
              
              lagta hai utre ho tum, kisi asman se humri zameen par,<br className="hidden sm:block"/>
              
              parashan hai gul, gulbadan bhi khak hue,<br className="hidden sm:block"/>
              shahar me Marz-e-Majnu faila,<br className="hidden sm:block"/>
              sab giraban jhak hua,<br className="hidden sm:block"/>
              
              suna ankhen bhi nahi hain andho ko,<br className="hidden sm:block"/>
              bezuban the jitna sab bebak hua,<br className="hidden sm:block"/>
              
              valla parstish hogi thumri, valla parstish hogi thumri,<br className="hidden sm:block"/>
              tum agar thahar jao yahi kahin par❤"
            </p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[2000ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Yaakin maano jis din aapko dekha na usdin se ek bhi asia sajda nahi kara jisme aapki mohabbat allaha na mangi hoo..</p>


            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[2200ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Jis din aapko nahi dekhta hona, mera Woh din aadhura lagta hai(chhodo aapko samaj me nahi ata...)</p>


            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[2400ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}> Aap bole the ki mai besharam hoon, haa hoon mai besharam hoon, kyu ki mere se bhi zyada meku aap zaruri hai</p>


            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[2600ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Bas meku aapse ye bolna hai ki…</p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[2800ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>meku aap se bepanah mohabbat hai..
            (magar ye to zaruri nai hai ki hum jisse bhi mohabbat karte hai vo hamare saath hoo..., bass dil me rahena chahiye.) <br className="hidden sm:block"/>
            Aap ko meri zindagi banana chahata hoon, agar aapki ijazat hoo to.. <br />
            Waise to 2 saal se to interaz karon aur 1 saal hai, woh 1 saal  bhi karleton... Bakhi allaha ki marzi</p>

            <p className={`mb-3 md:mb-4 leading-relaxed transition-all duration-1000 delay-[3000ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Bas dua hai ki... kabhi na kabhi to aapko samaj me aye ki meku aapse kitni mohabbat hai...</p>

            <p className={`mt-6 text-gray-700 text-sm sm:text-base italic leading-relaxed transition-all duration-1000 delay-[3200ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Hoti rahegi mulakatein tumse, nigahon se dur ho dil se nahi</p>

            <p className={`mt-6 text-gray-700 text-sm sm:text-base font-semibold italic leading-relaxed transition-all duration-1000 delay-[3400ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>Once again sorry, agar mere wajha se kabhi aapko taklif hui ho toh.</p>


            <p className={`mt-6 text-gray-700 text-sm sm:text-base italic leading-relaxed transition-all duration-1000 delay-[3600ms] ${
              isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>P.S. If anything in this letter has caused you any discomfort or hurt your feelings, I sincerely apologize. That was never my intention, and it never will be</p>
          </div>
          
          <div className={`mt-6 md:mt-8 flex justify-center transition-all duration-1000 delay-[3800ms] ${
            isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <Button
              onClick={() => navigate('/questions')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#f857a6] to-[#ff5858] text-white text-sm sm:text-base font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyFeelings;