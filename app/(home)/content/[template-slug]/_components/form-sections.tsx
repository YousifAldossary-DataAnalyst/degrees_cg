"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_component/template-list-section";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>();

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  const HandleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="gap-5 flex items-left justify-start flex-col">
      <Card className="p-5 shadow-md shadow-primary border rounded-lg">
        <Image src={selectedTemplate?.icon!} alt="icon" width={70} height={70} />
        <CardHeader className="px-0">
          <CardTitle className="font-bold text-2xl mb-2 ">
            {selectedTemplate?.name}
          </CardTitle>
          <CardDescription className="text-sm">
            {selectedTemplate?.desc}
          </CardDescription>
        </CardHeader>

        <form className="gap-5 flex flex-col" onSubmit={onSubmit}>
          {selectedTemplate.form?.map((media, index) => (
            <div key={index} className="flex flex-col my-2 gap-4">
              <Label>{media.label}</Label>
              {media.field == "input" ? (
                <Input
                  placeholder="Health"
                  name={media.name}
                  required={media.required}
                  onChange={HandleInputChange}
                  className="border rounded-md border-primary/80"
                />
              ) : media.field == "textarea" ? (
                <Textarea
                  className="border rounded-md border-primary/80"
                  placeholder="describe ..."
                  name={media.name}
                  required={media.required}
                  onChange={HandleInputChange}
                />
              ) : null}
            </div>
          ))}
          <Button type="submit" className="flex gap-2" disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin"/> : "Generate"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default FormSection;
