"use client";

import { BsGithub, BsTwitterX } from "react-icons/bs";

import { FaProductHunt } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

const Socials = () => {
  return (
    <div className="mx-auto flex flex-row items-center">
      <a
        href="https://github.com/all-in-aigc/sorafm?utm_source=sora.fm"
        target="_blank"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsGithub className="text-lg" />
      </a>
      <a
        href="https://twitter.com/idoubicc?utm_source=sora.fm"
        target="_blank"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsTwitterX className="text-lg" />
      </a>
      <a
        href="https://www.producthunt.com/posts/sora-ai-video-generator?utm_source=sora.fm"
        target="_blank"
        className="mx-3 hidden md:flex max-w-[24px] flex-col items-center justify-center"
      >
        <FaProductHunt className="text-lg" />
      </a>
      <a
        href="https://www.buymeacoffee.com/idoubi?utm_source=sora.fm"
        target="_blank"
        className="mx-3 hidden md:flex max-w-[24px] flex-col items-center justify-center"
      >
        <SiBuymeacoffee className="text-lg" />
      </a>
    </div>
  );
}

export default Socials;