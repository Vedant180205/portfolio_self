import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vedant Patil — Builder & Engineer",
  description:
    "Portfolio of Vedant Patil — I build real-world systems that combine embedded engineering, machine learning and software to solve meaningful problems.",
  keywords: ["Vedant Patil", "portfolio", "engineer", "builder", "embedded", "machine learning", "software"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
