import { links, profile } from "@/content/resume";

/*
 * Opening block of the page: role label, name set large in the serif
 * display face, a short introduction and the primary contact links.
 * It deliberately has no section rule above it so the name is the first
 * thing the eye lands on.
 */
export function Hero() {
  return (
    <section id="top" className="py-20 md:py-28">
      <p className="label text-accent">{profile.role}</p>

      <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
        {profile.intro}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
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
