import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
// const id = useUser()
// const auth = (req: Request) => ({id: id.user?.id});

export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      //ClerkAuth
      const session = auth();
 
      if (!session) throw new UploadThingError("Unauthorized");
 
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
