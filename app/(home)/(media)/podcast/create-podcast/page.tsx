"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Loader2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import GeneratePodcast from "@/components/podcast/generate-podcast";
import GenerateThumbnail from "@/components/podcast/generate-thumbnail";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
  const router = useRouter();
  const [imagePrompt, setImagePrompt] = useState("");

  //WIP: Storage
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");

  //
  const [audioUrl, setAudioUrl] = useState("");

  //WIP: Storage
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const createPodcast = useMutation(api.podcasts.createPodcast)

  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if(!audioUrl || !imageUrl || !voiceType) {
        toast({
          title: 'Please generate audio and image',
        })
        setIsSubmitting(false);
        throw new Error('Please generate audio and image')
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      })

      toast({ title: 'Podcast created' })
      setIsSubmitting(false);
      router.push('/podcast/records')
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        variant: 'destructive',
      })
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-4 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <p className="text-xs text-muted-foreground flex flex-col gap-3 pt-2">
        Please save your audio and generated image.
        <br /> <b>All these limitations are only temporarily</b>
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-primary/50 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-sm font-bold">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-primary"
                      placeholder="e.g. Go Pro"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-sm font-bold">Select AI Voice</Label>

              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-primary bg-white text-gray-500 focus-visible:ring-offset-primary/20"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray "
                  />
                </SelectTrigger>
                <SelectContent className="text-sm border-none  bg-white font-bold text-black focus:ring-primary/20">
                  {voiceCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize focus:bg-secondary"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Write a short podcast description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />

            {/* <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-base text-white w-full bg-primary/80 py-4 font-extrabold transition-all duration-500 hover:bg-primary"
              >
                {isSubmitting ? (
                  <>
                    Saving
                    <Loader2Icon size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Save the Podcast"
                )}
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
