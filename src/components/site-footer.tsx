import { links, profile } from "@/content/resume";

/*
 * Closing block of the CV page. It repeats the two column grid of Section
 * rather than using the component itself, because the content is a call to
 * action instead of a list. Doubles as the target of the Contact anchor.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-rule py-16 md:py-24"
    >
      <div className="grid gap-8 md:grid-cols-[11rem_1fr] md:gap-14">
        <h2 className="label-lg text-ink">Contact</h2>

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

          {/* Bottom strip: copyright on one side, the same links as the home
              page on the other, so visitors never have to scroll back up. */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
            <p className="label text-ink-faint">
              Copyright {year} {profile.name}
            </p>
            <ul className="flex flex-wrap gap-6">
              {links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="label text-ink-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
