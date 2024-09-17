import { Button } from "@/components/ui/button";
import { AIoutput } from "@/db/schema";

import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import { TEMPLATE } from "../content/_component/template-list-section";
import Templates from "../(data)/Templates";
import { db } from "@/db/db";
import CopyButton from "./_components/copy-button";

export interface HISTORY {
  id: string | null;
  formData: string | null;
  aiResponse: string | null;
  templateSlug: string | null;
  createdBy: string | null;
  createAt: string | null;
}

async function History() {
  const user = await currentUser();

  {
    /* @ts-ignore */
  }
  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIoutput)
    .where(eq(AIoutput?.createdBy, user?.primaryEmailAddress?.emailAddress!))
    .orderBy(desc(AIoutput.id));
  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | any = Templates?.find(
      (media) => media.slug == slug
    );
    return template;
  };
  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl dark:text-gray-800">History</h2>
      <p className="text-gray-500">
        Search your previously generate AI content
      </p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3 text-xs md:text-sm lg:text-base ">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2 className="flex items-center flex-col justify-center">DATE</h2>
        <h2 className="flex items-center flex-col justify-center">WORDS</h2>
        <h2 className="flex items-center flex-col justify-center">COPY</h2>
      </div>
      {HistoryList.map((item: HISTORY, index: number) => (
        <>
          <div className="grid grid-cols-7 my-5 py-3 px-3 text-xs md:text-sm lg:text-base dark:text-gray-800">
            <h2 className="col-span-2 flex gap-2 items-start lg:items-center flex-col lg:flex-row">
              <Image
                src={GetTemplateName(item?.templateSlug!)?.icon}
                width={25}
                height={25}
                alt="icon"
              />
              {GetTemplateName(item.templateSlug!)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3 mr-3">{item?.aiResponse}</h2>
            <h2 className="flex items-center flex-col justify-center">{item.createAt}</h2>
            <h2 className="flex items-center flex-col justify-center">{item?.aiResponse!.length}</h2>
            <h2 className="flex items-center flex-col justify-center">
              <CopyButton aiResponse={item.aiResponse} />
            </h2>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}

export default History;
