import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";
import { profile } from "@/content/resume";
import { cvSectionHref, cvSections } from "@/content/sections";

/*
 * Sticky top bar, identical on every page. It always lists the CV sections,
 * so the full scope of the site is visible even from the bare home page.
 * Links point at /cv anchors: from the home page that is a navigation, from
 * the CV page it is a scroll to the matching section.
 *
 * The bar wraps instead of hiding links on narrow screens, because losing the
 * titles is exactly what this navigation is meant to avoid.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper/85 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link
          href="/"
          className="label text-ink transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <nav
          aria-label="Curriculum sections"
          className="flex items-center gap-x-5 gap-y-2"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {cvSections.map((section) => (
              <li key={section.id}>
                <Link
                  href={cvSectionHref(section.id)}
                  className="label text-ink-muted transition-colors hover:text-accent"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
