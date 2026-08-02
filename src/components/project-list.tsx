import { Tag } from "@/components/tag";
import { projects } from "@/content/resume";

/*
 * Project showcase. Mirrors the layout of the work section, with the venue
 * in place of the period and a row of tool tags closing each entry.
 * A project title only becomes a link when the data provides a href.
 */
export function ProjectList() {
  return (
    <div className="space-y-12">
      {projects.map((project) => (
        <article key={project.title}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-3xl">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="label text-ink-faint">{project.venue}</p>
          </header>

          <div className="mt-3 space-y-3 leading-relaxed text-ink-muted text-pretty">
            {project.description
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
