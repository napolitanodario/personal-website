import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/resume";
import "./globals.css";

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* Downloaded at build time and served from our own domain, so no      */
/* request ever reaches Google at runtime. Each one is exposed as a    */
/* CSS variable that globals.css maps to a Tailwind font family.       */
/* ------------------------------------------------------------------ */

/** Body copy. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** Display face for headings. Single weight, italic included. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/** Labels, dates and navigation. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  metadataBase: new URL(`https://${profile.site}`),
  title: `${profile.name} - Software Engineer`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} - Software Engineer`,
    description: profile.intro,
    url: "/",
    siteName: profile.name,
    locale: "en",
    type: "website",
  },
};

/*
 * Runs before the first paint and restores a previously chosen theme.
 * Without it the page would render with the system theme for one frame
 * and then flip, which reads as a flash. Kept as a minified string
 * because it is inlined into the document head.
 */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      /* The theme script mutates html before hydration, so the server
         and client markup legitimately differ on this element. */
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
