import Socials from "./_components/socials";

const Footer = () => {
  return (
    <section className="">
      <div className="w-screen stick-bottom flex-col bg-primary px-6 pt-14 pb-2 text-white lg:flex lg:px-10 xl:px-24">
        <div className="lg:flex lg:flex-row lg:justify-between">
          <div>
            <a href="https://sora.fm" className="inline-block max-w-full">
              DegreeCG
            </a>
            <div className="mb-8 mt-6 flex flex-row">
              <Socials />
            </div>
          </div>
          <div className="flex grow flex-row flex-wrap lg:mx-10 lg:flex-nowrap lg:justify-center">
            <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
              <div className="font-inter font-medium">INTRODUCTION</div>
              <a
                href="https://openai.com/sora?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                What is Degrees CG
              </a>
              <a
                href="https://openai.com/research/video-generation-models-as-world-simulators?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                Degrees technical report
              </a>
              <a
                href="https://www.tiktok.com/@openai?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                Degrees CG Showcases
              </a>
            </div>
            <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
              <div className="font-inter font-medium">FRIENDS</div>
              <a
                href="https://gpts.works?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                GPTs Works
              </a>
              <a
                href="https://gptalk.one?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                GPTalk
              </a>
              <a
                href="https://aiwallpaper.shop?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                AI Wallpaper
              </a>
              <a
                href="https://aicover.design?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                AI Cover
              </a>
              <a
                href="https://readknown.cn?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                ReadKnown
              </a>
            </div>
            <div className="mb-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10">
              <div className="font-inter font-medium">CREDIT TO</div>
              <a
                href="https://sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                Degrees
              </a>
              <a
                href="https://www.stablevideo.com?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                Stable Video
              </a>
              <a
                href="https://pika.art?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                Pika
              </a>
              <a
                href="https://runwayml.com/ai-tools/gen-2?utm_source=sora.fm"
                target="_blank"
                className="font-inter font-light text-white"
              >
                Gen-2
              </a>
            </div>
        </div>
        </div>
        <div className="mx-auto w-full border-t-2 border-gray-800">
        <div>
          <p className="font-inter lg:text-center text-sm text-white pt-2">
            © Copyright 2024.{" "}
            <a href="https://sora.fm" target="_blank" className="text-muted-foreground dark:text-muted">
              Degree CG
            </a>{" "}
            All rights reserved.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;