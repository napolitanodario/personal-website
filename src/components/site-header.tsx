import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/resume";

/** Anchors matching the section ids declared in src/app/page.tsx. */
const nav = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/*
 * Sticky top bar. The translucent background plus backdrop blur keeps the
 * paper colour visible while content scrolls underneath. Section links are
 * hidden on small screens, where the page is short enough to just scroll.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="label text-ink transition-colors hover:text-accent"
        >
          {profile.name}
        </a>
        <nav className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 sm:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label text-ink-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
