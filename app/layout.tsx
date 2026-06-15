import type { Metadata } from "next";

import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Inter,
  Sacramento,
  Anton,
  Arapey,
  Manrope,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const arapey = Arapey({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-arapey",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anjef Dangol — Frontend Developer",
    template: "%s | Anjef Dangol",
  },
  description:
    "Portfolio of Anjef Dangol, a passionate Frontend Developer from Nepal specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "Anjef Dangol",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Developer Nepal",
    "Portfolio",
    "Full Stack Developer",
  ],
  authors: [{ name: "Anjef Dangol", url: "https://www.anjef.com.np" }],
  creator: "Anjef Dangol",
  metadataBase: new URL("https://www.anjef.com.np"),
  openGraph: {
    title: "Anjef Dangol — Frontend Developer",
    description: "Frontend Developer Portfolio — React, Next.js, TypeScript",
    url: "https://www.anjef.com.np",
    siteName: "Anjef Dangol",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjef Dangol — Frontend Developer",
    description: "Frontend Developer Portfolio",
    creator: "@_anjef",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sacramento.variable} ${anton.variable} ${arapey.variable} ${manrope.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-body antialiased">
  <ErrorBoundary>{children}</ErrorBoundary>
</body>
    </html>
  );
}