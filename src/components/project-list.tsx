"use client";

import Image from "next/image";
import { useState } from "react";

import { Tag } from "@/components/tag";
import { projects } from "@/content/resume";
import type { Project } from "@/content/resume";

/** About three lines of body copy; shorter texts skip the toggle. */
const COLLAPSE_AFTER_CHARS = 180;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function paragraphsOf(description: Project["description"]): string[] {
  return Array.isArray(description) ? description : [description];
}

function ExpandableDescription({
  description,
  image,
}: {
  description: Project["description"];
  image?: Project["image"];
}) {
  const paragraphs = paragraphsOf(description);
  const fullText = paragraphs.join(" ");
  const [expanded, setExpanded] = useState(false);
  const collapsible = fullText.length > COLLAPSE_AFTER_CHARS;

  const collapsed = collapsible && !expanded;

  return (
    <div className="mt-3">
      <div className="relative">
        <div
          className={`space-y-4 ${
            collapsed
              ? "max-h-32 overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
              : ""
          }`}
        >
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="leading-relaxed text-ink-muted text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {(expanded || !collapsible) && image ? (
        <figure className="mt-6">
          <Image
            src={image.src}
            alt={image.alt}
            width={1600}
            height={900}
            className="h-auto w-full border border-rule"
          />
        </figure>
      ) : null}

      {collapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="label mt-3 inline-block border-b border-rule pb-1 text-accent transition-colors hover:border-accent"
        >
          {expanded ? "close" : "read more"}
        </button>
      ) : null}
    </div>
  );
}

/*
 * Project showcase. Mirrors the layout of the work section, with the venue
 * in place of the period and a row of tool tags closing each entry.
 * When a project has a GitHub href, an icon beside the title opens the repo.
 * Long descriptions collapse behind read more so the section stays scannable.
 */
export function ProjectList() {
  return (
    <div className="space-y-15">
      {projects.map((project) => (
        <article key={project.title}>
          <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div className="flex items-center gap-5">
              <h3 className="font-serif text-3xl">{project.title}</h3>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} on GitHub`}
                  className="text-ink-muted transition-colors hover:text-accent"
                >
                  <GitHubIcon className="size-7" />
                </a>
              ) : null}
            </div>
            <p className="label text-ink-faint">{project.venue}</p>
          </header>

          <ExpandableDescription
            description={project.description}
            image={project.image}
          />

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
