import { Metadata } from "next";

export const APP_NAME = process.env.APP_NAME || "Exam Sync";
export const AUTHOR = process.env.AUTHOR || "Meet Rathod";
export const APP_URL = process.env.APP_URL || "https://examsync.com";
export const SOCKET_URL = process.env.APP_URL || "http://localhost:5001/exam";
export const APP_LOGO = "/app_logo.jpg";

export const META_DATA: Metadata = {
  title: `${APP_NAME} - Seamless Online Exam Management`,
  description: `${APP_NAME} simplifies online exam creation, management, and student assessments. A modern, intuitive platform for examiners and students.`,
  keywords: [
    "online exams",
    "exam management",
    "student assessment",
    "exam platform",
    "education technology",
  ],
  authors: [{ name: AUTHOR, url: APP_URL }],
  creator: AUTHOR,
  robots: "index, follow",
  openGraph: {
    title: `${APP_NAME} - Seamless Online Exam Management`,
    description:
      "A modern platform to streamline online exams for examiners and students.",
    url: APP_URL,
    siteName: APP_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: APP_LOGO,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} platform preview`,
      },
    ],
  },
};
