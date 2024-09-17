import React from "react";

type Props = { children: React.ReactNode };

const HomeLayout = ({ children }: Props) => {
  return (
    <>
        <main className="h-full w-full">
          {children}
        </main>
    </>
  );
};

export default HomeLayout;
