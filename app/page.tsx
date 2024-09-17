"use client";
import { FlipWordsDemo } from "@/components/global/flip-words";
import { ThreeDCardDemo } from "@/components/ui/3d-cardeffect";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CardHoverEffectDemo } from "@/components/global/cards-hover";
import Footer from "@/components/global/footer";

export default function Home() {
  return (
    <div className="h-full overflow-x-hidden">
      <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
      <section>
        <div className="flex items-center justify-center flex-col mb-[80px] gap-4">
          <h2 className="text-white bg-primary px-4 py-4 mb-20 rounded-full text-lg ">
            <FlipWordsDemo/>
          </h2>
          <Image
            src="/images/Degrees-cg.png"
            width={500}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Instead of spending hours creating content for your social media! <br/>
            Get inspired using AI. Adjust the content the way you see fit or just post it!
          </p>
          <Link href='/content'>
          <Button className="bg-primary font-bold text-primary-foreground px-4">
            Start Now!
          </Button>
          </Link>
          <ThreeDCardDemo/>
          <CardHoverEffectDemo/>
        </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}
