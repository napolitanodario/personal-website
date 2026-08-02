import { education } from "@/content/resume";

/*
 * Academic background. Same header rhythm as the work section so the two
 * read as a continuous timeline: institution left, period right.
 */
export function EducationList() {
  return (
    <div className="space-y-10 sm:space-y-15">
      {education.map((entry) => (
        <article key={entry.institution}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:gap-x-6">
            <h3 className="font-serif text-[1.375rem] leading-snug sm:text-3xl">
              {entry.institution}
            </h3>
            {entry.period ? (
              <p className="label text-ink-faint">{entry.period}</p>
            ) : null}
          </header>

          <p className="mt-1.5 text-[0.9375rem] text-ink-muted sm:mt-2 sm:text-base">
            {entry.field ? `${entry.degree} - ${entry.field}` : entry.degree}
          </p>

          {entry.notes.length > 0 ? (
            <ul className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
              {entry.notes.map((note) => (
                <li
                  key={note}
                  className="text-[0.9375rem] leading-relaxed text-ink-muted text-pretty sm:text-base"
                >
                  {note}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}
