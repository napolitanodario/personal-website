import { Tag } from "@/components/tag";
import { projects } from "@/content/resume";

export function ProjectList() {
  return (
    <div className="space-y-12">
      {projects.map((project) => (
        <article key={project.title}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-serif text-2xl">
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
          <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
            {project.description}
          </p>
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
