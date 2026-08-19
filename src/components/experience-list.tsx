import { experience } from "@/content/resume";
import type { Experience, ExperienceProject } from "@/content/resume";

/*
 * One titled beat of a case study. The title is a small monospace label rather
 * than a heading, so it guides the eye without competing with the project name.
 */
function Beat({
  title,
  emphasis,
  children,
}: {
  title: string;
  /** Set on the results, the one beat worth finding without reading. */
  emphasis?: boolean;
  children: string;
}) {
  return (
    <div>
      <p className={`label ${emphasis ? "text-accent" : "text-ink-faint"}`}>
        {title}
      </p>

      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink text-pretty sm:mt-2 sm:text-[0.9375rem]">
        {children}
      </p>
    </div>
  );
}

/*
 * Long form account of a single project inside a position, told in four beats.
 * Titling each one lets a reader take only the results and move on, which is
 * what most people do when scanning a CV.
 */
function ProjectAccount({ project }: { project: ExperienceProject }) {
  return (
    <div>
      <h4 className="font-serif text-xl leading-snug sm:text-2xl">
        {project.name}
      </h4>

      <div className="mt-4 space-y-5 sm:mt-5 sm:space-y-6">
        <Beat title="Scenario">{project.scenario}</Beat>
        <Beat title="Approach">{project.approach}</Beat>
        <Beat title="Results" emphasis>
          {project.results}
        </Beat>
        <Beat title="Lesson learned">{project.lesson}</Beat>
      </div>
    </div>
  );
}

/*
 * One line per piece of work. Markers are drawn as accent rules rather than
 * dots, which keeps the list quiet enough to read as a summary.
 */
function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-[0.875rem] leading-relaxed text-pretty before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent sm:pl-5 sm:text-[0.9375rem]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Position({ job }: { job: Experience }) {
  return (
    <article>
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 sm:gap-x-6">
        <h3 className="font-serif text-2xl leading-snug sm:text-3xl">
          {job.company}
        </h3>
        <p className="label text-ink-faint">{job.period}</p>
      </header>

      <p className="mt-1.5 text-[0.875rem] text-ink-muted sm:mt-2 sm:text-[0.9375rem]">
        {job.role} - {job.location}
      </p>

      {job.highlights ? <Highlights items={job.highlights} /> : null}

      {job.projects ? (
        <details className="case-studies mt-5 sm:mt-8">
          <summary className="label inline-block border-b border-rule pb-0.5 text-accent transition-colors hover:border-accent sm:pb-1">
            <span className="case-studies-closed">
              read case studies
            </span>
            <span className="case-studies-open">close case studies</span>
          </summary>

          <div className="mt-8 space-y-8 sm:mt-12 sm:space-y-12">
            {job.projects.map((project) => (
              <ProjectAccount key={project.name} project={project} />
            ))}
          </div>
        </details>
      ) : null}
    </article>
  );
}

/*
 * Work history, most recent first. Every position states its work as a short
 * list; where case studies exist they wait behind a link, so the section can be
 * read end to end without expanding anything.
 */
export function ExperienceList() {
  return (
    <div className="space-y-10 sm:space-y-15">
      {experience.map((job) => (
        <Position key={`${job.company}-${job.period}`} job={job} />
      ))}
    </div>
  );
}
