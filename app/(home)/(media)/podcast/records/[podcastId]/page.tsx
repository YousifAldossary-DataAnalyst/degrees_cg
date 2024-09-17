'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'
import LoaderSpinner from '@/components/podcast/LoaderSpinner'
import PodcastDetailPlayer from './_components/podcast-player'
import PodcastPlayer from './_components/player'

const PodcastDetails = ({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) => {
  const { user } = useUser();

  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId })

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId })

  const isOwner = user?.id === podcast?.authorId;

  if(!similarPodcasts || !podcast) return <LoaderSpinner />

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-lg font-bold">
          Currenty Playing
        </h1>
      </header>

      {/* <PodcastDetailPlayer
        isOwner={isOwner}
        podcastId={podcast._id}
        {...podcast}
      /> */}

      <p className=" text-base pb-8 pt-[45px] font-medium max-md:text-center">{podcast?.podcastDescription}</p>

      <div className="flex flex-col gap-8 bg-secondary p-4 border-muted-foreground border-2 rounded-md">
        <div className='flex flex-col gap-4'>
          <h1 className='text-sm font-bold '>Transcription</h1>
          <p className="text-sm font-medium ">{podcast?.voicePrompt}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-sm font-bold '>Thumbnail Prompt</h1>
          <p className="text-sm font-medium ">{podcast?.imagePrompt}</p>
        </div>
      </div>
      <PodcastPlayer/>
    </section>
  )
}

export default PodcastDetails