import Image from "next/image";
import Link from "next/link";

import { introParts, links, profile } from "@/content/resume";

const introLinkClassName =
  "text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

/*
 * The entire content of the home page: portrait, role, name, introduction
 * and contact links. Spacing is kept tight on purpose so the block fits in
 * one viewport, its vertical placement is handled by the page.
 */
export function Hero() {
  return (
    <section>
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
        className="size-32 rounded-full object-cover object-top ring-1 ring-rule md:size-40"
      />

      <p className="label mt-8 text-accent">{profile.role}</p>

      <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">
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

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {links.map((link) => {
          /* Mailto links stay in the current tab, external ones open a new one. */
          const isExternal = link.href.startsWith("http");
          return (
            <a
              key={link.href}
              href={link.href}
              download={link.download}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="label border-b border-rule pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
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
