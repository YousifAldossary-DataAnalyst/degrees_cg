'use client'
import Header from "@/components/global/Header";
import React, { useState } from "react";
import SearchSections from "./_component/search-section";
import TempleteSection from "./_component/template-list-section";
import { BackgroundGradientAnimationDemo } from "@/components/global/gradiants";

type Props = {};

const ContentPage = (props: Props) => {
    const [searchIput, setSearchInput] = useState<string>()
  return (
    <div>
      {/* <Header /> */}
      <BackgroundGradientAnimationDemo />
      <SearchSections onSearchInput={(value: string) => setSearchInput(value)}/>
      <TempleteSection searchIput = {searchIput}/>
    </div>
  );
};

export default ContentPage;
