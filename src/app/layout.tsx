import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DotGrid } from "@/components/DotGrid";
import { Navbar } from "@/components/Navbar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skolar Education | Australia's Intelligent AI Study Companion",
  description:
    "Curriculum-aligned practice, examiner-style feedback and real learning for ATAR students. Built specifically for VCE, HSC, QCE, SACE, and WACE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans antialiased relative min-h-screen`}>
        <DotGrid />
        <Navbar />
        <main className="relative z-0">{children}</main>
      </body>
    </html>
  );
}
