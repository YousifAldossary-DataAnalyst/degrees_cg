import PodcastSideBar from "@/components/podcast-sidebar/leftsidebar";
import AudioProvider from "@/providers/audio-provider";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="relative flex flex-col">
        <main className="relative flex">
          <PodcastSideBar />

          <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
              <div className="flex flex-col">
                <AudioProvider>{children}</AudioProvider>
              </div>
            </div>
          </section>

          {/* <RightSidebar /> */}
        </main>
      </div>
  );
};

export default Layout;
