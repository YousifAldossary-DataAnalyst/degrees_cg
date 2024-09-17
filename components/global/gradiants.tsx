import React from "react";
import { BackgroundGradientAnimation } from "../ui/gradiant-boost";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex-col flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b  to-white/60 from-white/80">
            Generate Content!<br/>
             
        </p>
       <p className=' text-xs text-center md:text-sm lg:text-base pt-8 text-white/60'>
                Start creating content today! <br/>
                no hustle! <br/>
                Ask and you shall receive!
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
