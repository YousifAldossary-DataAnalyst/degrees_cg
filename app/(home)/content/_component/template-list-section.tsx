import React, { useEffect, useState } from "react";
import Templates from "../../(data)/Templates";
import TemplateCard from "./template-card";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

const TempleteSection = ({ searchIput }: any) => {

  const [templateList, setTemplateList] = useState(Templates);

  useEffect(() => {
    console.log(searchIput)
    if (searchIput) {
      const filterData = Templates.filter((media) =>
        media.name.toLowerCase().includes(searchIput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Templates);
    }
  }, [searchIput]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 px-10 ">
      {templateList.map((media: TEMPLATE, index) => (
        <TemplateCard {...media} key={index}/>
      ))}
    </div>
  );
};

export default TempleteSection;
