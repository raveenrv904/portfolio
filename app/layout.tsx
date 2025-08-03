import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Raveen R V - Portfolio",
    template: "%s | Raveen",
  },
  description:
    "Full-stack developer and designer creating exceptional digital experiences.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Full Stack",
    "Developer",
    "Portfolio",
  ],
  authors: [{ name: "Raveen R V", url: "https://raveen.com" }],
  creator: "Raveen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raveen.com",
    title: "Raveen - Portfolio",
    description:
      "Full-stack developer and designer creating exceptional digital experiences.",
    siteName: "Raveen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raveen - Portfolio",
    description:
      "Full-stack developer and designer creating exceptional digital experiences.",
    creator: "@raveenrv904",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
