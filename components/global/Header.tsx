import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { Lampeffect } from "./lampeffect";
import { SparklesCore } from "../ui/sparklings";

function Header() {
  return (
      <div className="flex justify-center p-5 border-b-2 shadow-sm border-[#4739e6]">
        <div className="flex gap-2 items-center justify-between max-w-xl p-2 ">
          <Search />
          <Input
            type="text"
            placeholder="Search..."
            className="outline-none w-full"
          />
        </div>
      </div>
  );
}

export default Header;

{/* <div className="flex items-center justify-center">
<div className="w-[40rem] h-40 relative">
  {/* Gradients */}
  // <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#4739e6] to-transparent h-[2px] w-3/4 blur-sm" />
  // <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#4739e6] to-transparent h-px w-3/4" />
  // <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#8880dd] to-transparent h-[5px] w-1/4 blur-sm" />
  // <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#8880dd] to-transparent h-px w-1/4" />

  {/* Core component */}
  // <SparklesCore
  //   background="transparent"
  //   minSize={0.4}
  //   maxSize={1}
  //   particleDensity={2000}
  //   className="w-full h-full"
  //   particleColor="#4739e6"
  // />

  {/* Radial Gradient to prevent sharp edges */}
//   <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
// </div>
// </div> */}