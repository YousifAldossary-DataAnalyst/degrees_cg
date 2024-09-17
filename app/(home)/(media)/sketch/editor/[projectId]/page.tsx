'use client'
import { Button } from "@/components/ui/button";
import Editor from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIDPage = ({ params }: EditorProjectIdPageProps) => {
  const { 
    data, 
    isLoading, 
    isError
  } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-y-5 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          Failed to fetch project
        </p>
        <Button asChild variant="secondary">
          <Link href="/sketch">
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Editor initialData={data} />
    </div>
  );
};

export default EditorProjectIDPage;