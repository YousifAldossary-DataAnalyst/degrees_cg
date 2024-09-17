"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/global/mode-toggle";

import { useParams, usePathname, useRouter } from "next/navigation";
import NavButton from "./nav-button";

import { useMedia, useSearchParam } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  FileClock,
  Home,
  ImageIcon,
  Loader2,
  Menu,
  PaletteIcon,
  PencilRuler,
  Mic,
  Settings,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const routes = [
  {
    href: "/",
    icon: Home,
    label: "Home",
  },
  {
    href: "/content",
    icon: BrainCircuit,
    label: "Content",
  },
  {
    href: "/history",
    icon: FileClock,
    label: "History",
  },
  // {
  //   href: "/cv",
  //   icon: FileText,
  //   label: "Resume",
  // },
  {
    href: "/setting",
    icon: Settings,
    label: "Setting",
  },
  {
    href: "/sketch",
    icon: PencilRuler,
    label: "Sketch",
  },
  {
    href: "/whiteboard",
    icon: PaletteIcon,
    label: "Whiteboard",
  },
  {
    href: "/podcast",
    icon: Mic,
    label: "Podcast",
  },
];

type Props = {
  user?: User;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams<{ boardId: string }>();

  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useMedia("(max-width: 1130px)", false);
  const { user } = useUser();

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        {params.boardId ? (
          ""
        ) : (
          <div className="p-4 flex items-center justify-between relative border ">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <Button
                  variant="outline"
                  className="font-normal m-6 bg-primary/20 hover:bg-primary/60 hover:text-white border-none 
          focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-primary/90 
          focus:bg-primary/90 transition"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-2">
                <nav className="flex flex-col gap-y-2 pt-6">
                  {routes.map((route) => (
                    <Button
                      key={route.href}
                      variant={route.href === pathName ? "secondary" : "ghost"}
                      onClick={() => onClick(route.href)}
                      className="w-full justify-start text-primary/60 hover:text-primary focus:text-primary"
                    >
                      <route.icon className="mr-4 lg:hidden" />
                      {route.label}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
              <aside className="flex flex-row gap-6 items-center">
                <ClerkLoaded>
                  <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
                <ClerkLoading>
                  <Loader2 className="size-8 animate-spin text-primary" />
                </ClerkLoading>
                <ModeToggle />
              </aside>
            </Sheet>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {params.boardId ? (
        ""
      ) : (
        <div className="p-4 flex items-center justify-between relative border ">
          <aside className="flex items-center ">
            <Link href="/">
              <Image
                className="hidden md:block pr-4"
                src={"/images/Degrees-cg.png"}
                width={100}
                height={100}
                alt="Logo"
              />
            </Link>
          </aside>
          <nav className="hidden md:block absolute left-[50%] top[50%] transform translate-x-[-50%] ">
            <ul className="flex items-center justify-center gap-4 list-none">
              <li className="flex gap-2">
                {routes.map((route) => (
                  <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathName === route.href}
                  />
                ))}
              </li>
            </ul>
          </nav>
          <aside className="flex gap-6 items-center">
            <Link
              href={user ? "/" : "/sign-in"}
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary/95 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {
                  //WIP: Wire up user
                  user ? "Welcome" : "Log-in"
                }
              </span>
            </Link>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-primary" />
            </ClerkLoading>
            <ModeToggle />
          </aside>
        </div>
      )}
    </>
  );
};

export default Navigation;
