import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/site/navigation";
import ConvexClerkProvider from "@/providers/convex-provider";

const font = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Degrees CG",
  description: "Create content using AI.",
  icons: { icon: "" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
