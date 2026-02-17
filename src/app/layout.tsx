import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sagebrugh Wealth | Digital Assets Managed Like Wealth",
  description: "Sagebrush Wealth is a Dubai-based regulated digital asset wealth management firm delivering structured, governance-led exposure to digital assets.",
  keywords: ["regulated digital asset wealth management", "institutional-grade infrastructure", "secure custody and controls", "risk management and portfolio construction", "digital asset investment strategies", "structured investment solutions", "automated investing (DCA)"],
  icons: {
    icon: "https://raw.githubusercontent.com/DannyYo696/csassets/95707cd61cdb5e4873cd42d9c0db150e2f729307/sagebrush%20icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
