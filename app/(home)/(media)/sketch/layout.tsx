"use client";

import React from "react";
import { Providers } from "@/providers/canvas-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
};

export default Layout;
