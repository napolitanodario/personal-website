import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

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
