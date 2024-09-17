"use client";
import React, { useState } from "react";
import FormSection from "./_components/form-sections";
import TextEditor from "./_components/text-editor";
import { TEMPLATE } from "../_component/template-list-section";
import Templates from "../../(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import moment from "moment"

import { GenerateAIContent } from "@/lib/modal-ai";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/db/db";
import { AIoutput } from "@/db/schema";
import { useUser } from "@clerk/nextjs";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

const FormContent = (props: PROPS) => {
  const { toast } = useToast();
  const selectedTemplate: TEMPLATE | undefined = Templates.find(
    (media) => media.slug == props.params["template-slug"]
  );

  const [loading, isLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const user = useUser()

  const GenerateSubmit = async (formData: any) => {
    isLoading(true);

    const results = await GenerateAIContent(formData, selectedTemplate?.aiPrompt!);

    // console.log(results!);

    setAiOutput(results!);
    await SaveContent(formData, selectedTemplate?.slug, results)
    isLoading(false);

    toast({
      title: "Success",
      description: `Content for ${selectedTemplate?.name} has been generated! 😊`,
    });
  };

  const SaveContent = async (formData: any, slug: any, result: any) => {
    
    const results = await db.insert(AIoutput).values({
      userId: user.user?.id,
      formData: formData,
      templateSlug: slug,
      aiResponse: result,
      createdBy: user?.user?.primaryEmailAddress?.emailAddress,
      createAt: moment().format('DD/MM/yyyy'),
    })

    console.log(results)
  }

  return (
    <div>
      <Link className="ml-4" href="/content">
        <Button className="mt-4">
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <FormSection
          selectedTemplate={selectedTemplate!}
          userFormInput={(v: any) => GenerateSubmit(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <TextEditor aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default FormContent;
