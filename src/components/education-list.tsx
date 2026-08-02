import { education } from "@/content/resume";

/*
 * Academic background. Same header rhythm as the work section so the two
 * read as a continuous timeline: institution left, period right.
 */
export function EducationList() {
  return (
    <div className="space-y-15">
      {education.map((entry) => (
        <article key={entry.institution}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-3xl">{entry.institution}</h3>
            {entry.period ? (
              <p className="label text-ink-faint">{entry.period}</p>
            ) : null}
          </header>

          <p className="mt-2 text-ink-muted">
            {entry.field ? `${entry.degree} - ${entry.field}` : entry.degree}
          </p>

          {entry.notes.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {entry.notes.map((note) => (
                <li
                  key={note}
                  className="leading-relaxed text-ink-muted text-pretty"
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
