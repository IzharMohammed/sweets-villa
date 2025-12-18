import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/lenis";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import JsonLd from "@/components/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sri Mahalakshmi Sweets - Authentic Tradition",
    template: "%s | Sri Mahalakshmi Sweets",
  },
  description:
    "Handcrafted with premium ingredients and time-honored recipes since 1995. Curators of Authentic Tradition.",
  keywords: [
    "sweets",
    "indian sweets",
    "sri mahalakshmi sweets",
    "authentic sweets",
    "gifting",
    "traditional sweets",
    "premium sweets",
  ],
  authors: [{ name: "Sri Mahalakshmi Sweets" }],
  creator: "Sri Mahalakshmi Sweets",
  publisher: "Sri Mahalakshmi Sweets",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sweets-villa.vercel.app"),
  openGraph: {
    title: "Sri Mahalakshmi Sweets - Authentic Tradition",
    description:
      "Handcrafted with premium ingredients and time-honored recipes since 1995.",
    url: "https://sweets-villa.vercel.app",
    siteName: "Sri Mahalakshmi Sweets",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sri Mahalakshmi Sweets - Authentic Tradition",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Mahalakshmi Sweets - Authentic Tradition",
    description:
      "Handcrafted with premium ingredients and time-honored recipes since 1995.",
    images: ["/og-image.png"],
    creator: "@srimahalakshmisweets", // Placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <Providers>{children}</Providers>
        </SmoothScroll>{" "}
        <Toaster richColors position="top-center" />
        <JsonLd />
      </body>
    </html>
  );
}
