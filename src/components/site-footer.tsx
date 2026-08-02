import { links } from "@/content/resume";
import { Container } from "@/components/container";

/*
 * Site-wide footer: last-updated stamp and the same contact links as the home page.
 */
export function SiteFooter() {
  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="mt-auto border-t border-rule">
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 sm:gap-x-6 sm:gap-y-3 sm:py-6">
        <p className="label text-ink-faint">Last updated {lastUpdated}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
          {links.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  download={link.download}
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
      </Container>
    </footer>
  );
}
