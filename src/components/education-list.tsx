import { education } from "@/content/resume";

export function EducationList() {
  return (
    <div className="space-y-10">
      {education.map((entry) => (
        <article key={entry.institution}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-2xl">{entry.institution}</h3>
            <p className="label text-ink-faint">{entry.period}</p>
          </header>
          <p className="mt-1 text-sm text-ink-muted">
            {entry.degree} · {entry.field}
          </p>
          <ul className="mt-4 space-y-2">
            {entry.notes.map((note) => (
              <li key={note} className="leading-relaxed text-ink-muted text-pretty">
                {note}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
