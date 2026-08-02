import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";
import { profile } from "@/content/resume";
import { cvSectionHref, cvSections } from "@/content/sections";

/*
 * Sticky top bar, identical on every page. It always lists the CV sections,
 * so the full scope of the site is visible even from the bare home page.
 * Links point at /resume anchors: from the home page that is a navigation, from
 * the resume page it is a scroll to the matching section.
 *
 * On narrow screens the bar stays a single row: the section links scroll
 * horizontally instead of wrapping into stacked levels.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper/40 backdrop-blur-md">
      <Container className="flex items-center gap-3 py-2.5 sm:gap-6 sm:py-4">
        <Link
          href="/"
          className="label shrink-0 text-ink transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <nav
          aria-label="Curriculum sections"
          className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex items-center justify-end gap-x-3.5 whitespace-nowrap sm:gap-x-5">
            <ul className="flex items-center gap-x-3.5 sm:gap-x-5">
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
            <div className="shrink-0 border-l border-rule pl-3.5 sm:pl-5">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
