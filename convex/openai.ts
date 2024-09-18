"use server";
import { action } from "@/convex/_generated/server";
import { v } from "convex/values";

import OpenAi from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

// WIP: env. error again! api
const openai = new OpenAi({
  apiKey: "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",
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams['voice'],
      input,
    });

    const buffer = await mp3.arrayBuffer();
    
    return buffer;
  },
});

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })

    const url = response.data[0].url;

    if(!url) {
      throw new Error('Error generating thumbnail');
    }

    const imageResponse = await fetch(url);
    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  }
})