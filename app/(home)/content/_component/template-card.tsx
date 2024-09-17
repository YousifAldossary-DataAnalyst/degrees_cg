import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import React from "react";
import { TEMPLATE } from "./template-list-section";
import Image from "next/image";
import Link from "next/link";



function TemplateCard (media: TEMPLATE) {
  return (
    <Link href={`/content/${media.slug}`}>
      <CardContainer className="inter-var w-full h-full cursor-pointer">
        <CardBody className="bg-transparent relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl px-2">
          <CardItem translateZ="100" className="w-full">
            <div className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3">
            <Image
              src={media.icon}
              height={50}
              width={50}
              alt="icon"
            />
            <h2 className="font-medium text-lg text-primary">
                {media.name}
            </h2>
            <p className="text-primary/50 line-clamp-3">{media.desc}</p>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default TemplateCard;
