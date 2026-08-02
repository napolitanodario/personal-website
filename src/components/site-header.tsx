"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";
import { profile } from "@/content/resume";
import { cvSectionHref, cvSections } from "@/content/sections";

/** Minimum space between the brand name and the section links on one row. */
const MIN_ROW_GAP = 32;
/** Extra slack so subpixels / font swaps never leave a clipped edge. */
const FIT_SLACK = 16;

type NavLayout = "row" | "stack" | "menu";

function pickLayout(
  available: number,
  nameWidth: number,
  linksWidth: number,
): NavLayout {
  if (nameWidth + MIN_ROW_GAP + linksWidth + FIT_SLACK <= available) {
    return "row";
  }
  if (linksWidth + FIT_SLACK <= available) {
    return "stack";
  }
  return "menu";
}

/*
 * Sticky top bar, identical on every page. Section titles keep a fixed label
 * size and are never clipped: one row, a wrapped row, or a single menu.
 */
export function SiteHeader() {
  const shellRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLAnchorElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [layout, setLayout] = useState<NavLayout>("menu");
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const name = nameRef.current;
    const measure = measureRef.current;
    if (!shell || !name || !measure) return;

    const shellEl = shell;
    const nameEl = name;
    const measureEl = measure;

    function update() {
      const available = shellEl.clientWidth;
      const nameWidth = nameEl.offsetWidth;
      const linksWidth = Math.ceil(measureEl.scrollWidth);
      const next = pickLayout(available, nameWidth, linksWidth);
      setLayout((current) => (current === next ? current : next));
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(shell);

    let cancelled = false;
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) update();
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  /*
   * After row/stack mounts, confirm the live nav still fits. If not, collapse
   * to menu — this catches font-metric mismatches the measure node misses.
   */
  useLayoutEffect(() => {
    if (layout === "menu") return;
    const shell = shellRef.current;
    const nav = navRef.current;
    if (!shell || !nav) return;
    if (nav.scrollWidth > shell.clientWidth + FIT_SLACK) {
      setLayout("menu");
    }
  }, [layout]);

  useEffect(() => {
    if (layout !== "menu") setMenuOpen(false);
  }, [layout]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    function onPointer(event: MouseEvent) {
      if (!shellRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  const linkClassName =
    "label inline-flex items-center leading-none text-ink-muted transition-colors hover:text-accent";

  const brandClassName =
    "label inline-flex items-center leading-none text-ink transition-colors hover:text-accent";

  const sectionLinks = (
    <ul className="flex items-center gap-x-5">
      {cvSections.map((section) => (
        <li key={section.id}>
          <Link
            href={cvSectionHref(section.id)}
            className={linkClassName}
            onClick={() => setMenuOpen(false)}
          >
            {section.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  const shuffle = (
    <div className="flex shrink-0 items-center border-l border-rule pl-5">
      <ThemeToggle />
    </div>
  );

  return (
    <header className="sticky top-0 z-10 overflow-x-clip border-b border-rule bg-paper/40 backdrop-blur-md">
      <Container className="relative">
        {/*
         * Fixed + invisible: real label metrics, zero impact on document width.
         * A clipped 0×0 box was under-reporting width and forcing the overflowing
         * one-row layout seen on phones.
         */}
        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible fixed top-0 left-0 z-[-1] flex w-max items-center gap-x-5 whitespace-nowrap"
        >
          <ul className="flex items-center gap-x-5">
            {cvSections.map((section) => (
              <li key={section.id}>
                <span className="label">{section.title}</span>
              </li>
            ))}
          </ul>
          <div className="border-l border-rule pl-5">
            <span className="label">shuffle</span>
          </div>
        </div>

        <div
          ref={shellRef}
          className={
            layout === "stack" || (layout === "menu" && menuOpen)
              ? "flex w-full min-w-0 flex-col"
              : "w-full min-w-0"
          }
        >
          {/*
           * Fixed bar height so the compacted mobile menu matches desktop.
           * The dropdown expands below this row and does not change it.
           */}
          <div className="flex min-h-16 w-full min-w-0 items-center justify-between gap-4">
            <Link
              ref={nameRef}
              href="/"
              className={`${brandClassName} shrink-0`}
            >
              {profile.name}
            </Link>

            {layout === "menu" ? (
              <div className="flex shrink-0 items-center gap-x-5">
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="site-header-menu"
                  className={`${linkClassName} p-0`}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  {menuOpen ? "close" : "menu"}
                </button>
                {shuffle}
              </div>
            ) : null}

            {layout === "row" ? (
              <nav
                ref={navRef}
                aria-label="Curriculum sections"
                className="flex shrink-0 items-center gap-x-5 whitespace-nowrap"
              >
                {sectionLinks}
                {shuffle}
              </nav>
            ) : null}
          </div>

          {layout === "stack" ? (
            <nav
              ref={navRef}
              aria-label="Curriculum sections"
              className="flex min-h-16 w-full items-center justify-end gap-x-5 whitespace-nowrap"
            >
              {sectionLinks}
              {shuffle}
            </nav>
          ) : null}

          {layout === "menu" ? (
            <div
              id="site-header-menu"
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              inert={menuOpen ? undefined : true}
            >
              <div className="min-h-0 overflow-hidden">
                <nav
                  aria-label="Curriculum sections"
                  aria-hidden={!menuOpen}
                  className={`border-t border-rule py-4 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="flex flex-col items-end gap-y-3">
                    {cvSections.map((section) => (
                      <li key={section.id}>
                        <Link
                          href={cvSectionHref(section.id)}
                          className={linkClassName}
                          tabIndex={menuOpen ? undefined : -1}
                          onClick={() => setMenuOpen(false)}
                        >
                          {section.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
