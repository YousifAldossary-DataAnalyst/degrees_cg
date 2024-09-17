import { BackgroundGradientAnimationDemo } from "@/components/global/gradiants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchSections = ({onSearchInput}: any) => {

  return (
    <div>
      <div className="flex items-center justify-center my-6 w-full">
        <div className="flex gap-2 items-center justify-between max-w-xl p-2 w-full ">
          <Search />
          <Input
            type="text"
            placeholder="Search..."
            className="outline-none w-full bg-transparent border border-primary"
            onChange={(event) => onSearchInput(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSections;
