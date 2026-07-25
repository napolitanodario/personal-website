import { links, profile } from "@/content/resume";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-rule py-14 md:py-20"
    >
      <div className="grid gap-8 md:grid-cols-[9rem_1fr] md:gap-14">
        <h2 className="label text-ink-faint">Contact</h2>
        <div>
          <p className="font-serif text-3xl md:text-4xl text-balance">
            Open to conversations about performance, machine learning and
            anything self-hosted.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block border-b border-accent pb-1 text-lg text-accent"
          >
            {profile.email}
          </a>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
            <p className="label text-ink-faint">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <ul className="flex flex-wrap gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="label text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
