import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "ExamSync - Seamless Online Exam Management",
  description:
    "ExamSync simplifies online exam creation, management, and student assessments. A modern, intuitive platform for examiners and students.",
  keywords: [
    "online exams",
    "exam management",
    "student assessment",
    "exam platform",
    "education technology",
  ],
  authors: [{ name: "Meet Rathod", url: "https://yourwebsite.com" }],
  creator: "Meet Rathod",
  robots: "index, follow",
  openGraph: {
    title: "ExamSync - Seamless Online Exam Management",
    description:
      "A modern platform to streamline online exams for examiners and students.",
    url: "https://yourwebsite.com",
    siteName: "ExamSync",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ExamSync platform preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ExamSync - Seamless Online Exam Management",
    description:
      "A modern platform to streamline online exams for examiners and students.",
    creator: "@your_twitter_handle",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
