import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface props {
  aiOutput: string;
}

const TextEditor = ({ aiOutput }: props) => {
  const editorRef: any = useRef();

  useEffect(() => {
    const eidtorInstance = editorRef.current.getInstance();
    eidtorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  return (
    <div className="">
      <Card className="p-0 bg-white  shadow-md border rounded-md shadow-primary">
        <div className="flex justify-between items-center p-5">
          <CardTitle className="font-semibold text-lg dark:text-black">
            Results:
          </CardTitle>
          <CardDescription>
            <Button className="flex gap-2 dark:text-white " onClick={()=>navigator.clipboard.writeText(aiOutput)}>
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </CardDescription>
        </div>
        <CardContent className="p-0">
          <Editor
            ref={editorRef}
            initialValue="The content will be presented here!"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            onChange={() =>
              console.log(editorRef.current.getInstance().getMarkdown())
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TextEditor;
