import { links, profile } from "@/content/resume";

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
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="label border-b border-rule pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {link.label}
          </a>
        ))}
        <span className="label text-ink-faint">{profile.location}</span>
      </div>
    </section>
  );
}
