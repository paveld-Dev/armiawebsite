import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorFollower } from "@/components/effects/CursorFollower";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollToTopOnReload } from "@/components/utils/ScrollToTopOnReload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armia Systems | Software Engineering & Digital Product Development",
  description:
    "Armia Systems helps businesses design, engineer and scale high-performance digital products through software engineering, AI, cloud and product expertise.",
  keywords: [
    "Software Engineering",
    "Digital Product Development",
    "Enterprise Software",
    "AI Engineering",
    "Cloud DevOps",
    "Armia Systems",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-surface-deep font-sans text-foreground selection:bg-brand-accent selection:text-white"
      >
        <ScrollToTopOnReload />
        <PageLoader />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}

