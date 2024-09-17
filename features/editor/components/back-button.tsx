import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  return (
    <Link className="h-12 md:flex items-center mr-3" href="/sketch">
      <Button className="bg-secondary-foreground border-primary text-black rounded-md shadow-md dark:hover:text-white hover:text-white">
        <ArrowLeft />
        Back
      </Button>
    </Link>
  );
};
