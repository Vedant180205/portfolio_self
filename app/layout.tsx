import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vedant Patil — Builder & Engineer",
  description:
    "Portfolio of Vedant Patil — I build real-world systems that combine embedded engineering, machine learning and software to solve meaningful problems.",
  keywords: ["Vedant Patil", "portfolio", "engineer", "builder", "embedded", "machine learning", "software"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "icon", url: "/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    title: "Vedant Patil — Builder & Engineer",
    description: "I build real-world systems that combine embedded engineering, machine learning and software to solve meaningful problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Science+Gothic:wght@100..900&display=swap');`}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
