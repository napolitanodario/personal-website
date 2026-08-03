import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  weight: ["400", "700"],
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
 * Runs before the first paint and restores a previously shuffled palette.
 * Without it the page would flash the default tokens for one frame.
 * Kept as a minified string because it is inlined into the document head.
 */
const themeScript = `try{var p=JSON.parse(localStorage.getItem("palette")||"null");if(p&&p.paper&&p.accent&&p.ink&&p.paperRaised&&p.inkMuted&&p.inkFaint&&p.rule&&(p.scheme==="light"||p.scheme==="dark")){var r=document.documentElement;r.style.setProperty("--paper",p.paper);r.style.setProperty("--paper-raised",p.paperRaised);r.style.setProperty("--ink",p.ink);r.style.setProperty("--ink-muted",p.inkMuted);r.style.setProperty("--ink-faint",p.inkFaint);r.style.setProperty("--rule",p.rule);r.style.setProperty("--accent",p.accent);r.dataset.scheme=p.scheme}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full overflow-x-clip antialiased`}
      /* The theme script mutates html before hydration, so the server
         and client markup legitimately differ on this element. */
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip font-sans">
        {children}
        <Script
          src="https://analytics.napolitanodar.io/script.js"
          strategy="afterInteractive"
          data-website-id="1d1480b0-7f7b-45ed-9110-c298559abe4d"
        />
      </body>
    </html>
  );
}
