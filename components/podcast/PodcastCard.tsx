import { PodcastCardProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const PodcastCard = ({
  imgUrl,
  title,
  description,
  podcastId,
}: PodcastCardProps) => {
  const router = useRouter();
  const handleViews = () => {
    // increase views

    router.push(`/podcast/records/${podcastId}`, {
      scroll: true,
    });
  };

  return (
    <CardContainer className="inter-var w-fit h-fit cursor-pointer">
      <CardBody className="bg-transparent relative group/card hover:shadow-2xl dark:hover:shadow-purple-500/[0.1]  w-auto h-auto rounded-xl px-2">
        <CardItem translateZ="100" className="w-fit">
          <div className="cursor-pointer" onClick={handleViews}>
            <figure className="flex flex-col gap-2">
              <Image
                src={imgUrl}
                width={174}
                height={174}
                alt={title}
                className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
              />
              <div className="flex flex-col">
                <h1 className="text-base truncate font-bold">{title}</h1>
                <h2 className="text-sm truncate font-normal capitalize">
                  {description}
                </h2>
              </div>
            </figure>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default PodcastCard;
