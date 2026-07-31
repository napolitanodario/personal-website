import Image from "next/image";

import { links, profile } from "@/content/resume";

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
        className="size-28 rounded-full object-cover object-top ring-1 ring-rule md:size-36"
      />

      <p className="label mt-8 text-accent">{profile.role}</p>

      <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted text-pretty">
        {profile.intro}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {links.map((link) => {
          /* Mailto links stay in the current tab, external ones open a new one. */
          const isExternal = link.href.startsWith("http");
          return (
            <a
              key={link.href}
              href={link.href}
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
