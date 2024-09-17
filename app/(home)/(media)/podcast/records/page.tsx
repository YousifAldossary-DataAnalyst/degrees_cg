"use client";
import LoaderSpinner from "@/components/podcast/LoaderSpinner";
import PodcastCard from "@/components/podcast/PodcastCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  // const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  const getPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  if (!getPodcasts) return <LoaderSpinner />;

  // if(!trendingPodcasts) return <LoaderSpinner />
  return (
    <div className="mt-7 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Your Records</h1>
        <ScrollArea className="h-[calc(100vh+150px)] md:h-[calc(100vh+200px)] ">
            <div className="podcast_grid px-4 md:px-6">
              {getPodcasts?.map(
                ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                  <PodcastCard
                    key={_id}
                    imgUrl={imageUrl as string}
                    title={podcastTitle}
                    description={podcastDescription}
                    podcastId={_id}
                  />
                )
              )}
            </div>
        </ScrollArea>
      </section>
    </div>
  );
};

export default Page;
