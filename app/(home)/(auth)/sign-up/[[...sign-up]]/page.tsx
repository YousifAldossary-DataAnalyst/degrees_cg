// import { db } from "@/db/db";
// import { users } from "@/db/schema";
// import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { ClerkLoaded, ClerkLoading, SignUp, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
// import { toast } from "sonner";

const SignUpPage = async () => {
  // const mutation = useSignUp();
  // const user = useUser()

  // const onClick = () => {
  //   mutation.mutate(
  //     {
  //       id: user.user?.id!,
  //       email: user.user?.emailAddresses[0].emailAddress!,
  //     },
  //     {
  //       onSuccess: () => {},
  //     },
  //   );
  // };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-muted-foreground">
            Welcome Back!
          </h1>
          <p className="text-base text-primary">
            Log in or Create account to get started!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-primary hidden lg:flex items-center justify-center">
        <Image
          src="/images/Degrees-cg.png"
          height={600}
          width={600}
          alt="degreecg"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
