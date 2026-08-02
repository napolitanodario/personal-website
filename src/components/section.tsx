import type { ReactNode } from "react";

type SectionProps = {
  /** Anchor target used by the header navigation and the home page index. */
  id: string;
  title: string;
  children: ReactNode;
};

/*
 * Editorial two column shell shared by every section of the CV page.
 * On desktop the uppercase title sits in a narrow left column and stays
 * pinned while the content scrolls; on mobile the columns stack.
 * The top border is what draws the thin rule between sections.
 */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-rule py-8 sm:py-12 md:py-16"
    >
      <div className="grid gap-4 sm:gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
        <h2 className="label-lg font-bold md:sticky md:top-28 md:self-start">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
