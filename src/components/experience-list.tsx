import { experience } from "@/content/resume";

export function ExperienceList() {
  return (
    <div className="space-y-12">
      {experience.map((job) => (
        <article key={`${job.company}-${job.period}`}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-2xl">{job.company}</h3>
            <p className="label text-ink-faint">{job.period}</p>
          </header>
          <p className="mt-1 text-sm text-ink-muted">
            {job.role} · {job.location}
          </p>
          <ul className="mt-5 space-y-2.5">
            {job.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-5 leading-relaxed text-pretty before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
