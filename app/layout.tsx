import type { Metadata } from "next";
import { Protest_Guerrilla, Inter } from 'next/font/google';
import "./globals.css";

const protestGuerrilla = Protest_Guerrilla({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-name',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vedantpatil.dev'),
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
    url: 'https://vedantpatil.dev',
    siteName: 'Vedant Patil Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${protestGuerrilla.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
