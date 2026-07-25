import type { ReactNode } from "react";

type SectionProps = {
  /** Anchor target used by the header navigation. */
  id: string;
  title: string;
  children: ReactNode;
};

/*
 * Editorial two column shell shared by every section of the page.
 * On desktop the monospace title sits in a narrow left column and stays
 * pinned while the content scrolls; on mobile the columns stack.
 * The top border is what draws the thin rule between sections.
 */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-rule py-14 md:py-20"
    >
      <div className="grid gap-8 md:grid-cols-[9rem_1fr] md:gap-14">
        <h2 className="label text-ink-faint md:sticky md:top-24 md:self-start">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
