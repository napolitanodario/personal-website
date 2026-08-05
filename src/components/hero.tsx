import Image from "next/image";
import Link from "next/link";

import { introParts, links, profile } from "@/content/resume";

const introLinkClassName =
  "text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

/*
 * The entire content of the home page: portrait, role, name, introduction
 * and contact links. Spacing is kept tight on purpose so the block fits in
 * one viewport, its vertical placement is handled by the page.
 *
 * On phone / narrow widths the composition is centred around the portrait;
 * from the md breakpoint up it returns to the left-aligned editorial layout.
 */
export function Hero() {
  return (
    <section className="flex flex-col items-center text-center md:items-start md:text-left">
      {/*
       * The source photo is a portrait, so it is cropped to a circle with
       * object-cover. Anchoring the crop to the top keeps the face in frame;
       * switch to object-center if the framing ever changes.
       */}
      <Image
        src="/profile.jpg"
        alt={`Portrait of ${profile.name}`}
        width={320}
        height={320}
        priority
        className="size-36 rounded-full object-cover object-top ring-1 ring-rule md:size-40"
      />

      <p className="label mt-5 text-accent md:mt-8">{profile.role}</p>

      <h1 className="mt-2 font-serif text-[2.875rem] leading-[1.08] tracking-tight text-balance md:mt-4 md:text-6xl lg:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted text-pretty md:mt-6 md:text-lg">
        {introParts.map((part, index) => {
          if (part.type === "text") {
            return <span key={index}>{part.text}</span>;
          }

          if (part.external) {
            return (
              <a
                key={index}
                href={part.href}
                target="_blank"
                rel="noreferrer"
                className={introLinkClassName}
              >
                {part.text}
              </a>
            );
          }

          return (
            <Link key={index} href={part.href} className={introLinkClassName}>
              {part.text}
            </Link>
          );
        })}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:mt-8 md:justify-start md:gap-x-6 md:gap-y-3">
        {links.map((link) => {
          /* Mailto stays here; http and PDF open in a new tab for viewing. */
          const opensInNewTab =
            link.href.startsWith("http") || link.href.endsWith(".pdf");
          return (
            <a
              key={link.href}
              href={link.href}
              download={link.download}
              target={opensInNewTab ? "_blank" : undefined}
              rel={opensInNewTab ? "noreferrer" : undefined}
              className="label border-b border-rule pb-0.5 text-ink transition-colors hover:border-accent hover:text-accent sm:pb-1"
            >
              {link.label}
            </a>
          );
        })}
        <span className="label text-ink-faint">{profile.location}</span>
      </div>
    </section>
  );
}
