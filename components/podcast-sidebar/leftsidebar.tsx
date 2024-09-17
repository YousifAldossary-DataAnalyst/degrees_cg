'use client';
import { sidebarLinks } from "@/constants/sidebar-links";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/podcast-links";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {};

const PodcastSideBar = (props: Props) => {
    const pathname = usePathname();
    const params = useParams<{podcastId: string}>()
    // const router = useRouter();
    // const { audio } = useAudio();
  return (
    <section
    className={"sidebar h-[calc(100vh+600px)] lg:h-[calc(100vh+300px)]"}
    >
      <nav className="flex flex-col gap-6">
        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex gap-3 items-center bg-primary/80 rounded-md hover:bg-primary py-4 max-lg:px-4 justify-center w-full ",
                {
                  "bg-primary border-r-4 border-gray-600 dark:border-white": isActive, 
                }
              )}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default PodcastSideBar;
