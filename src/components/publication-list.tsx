import { publications } from "@/content/resume";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M3.75 2h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-3.5a.75.75 0 011.5 0v3.5A1.75 1.75 0 0112.25 14h-8.5A1.75 1.75 0 012 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1z" />
    </svg>
  );
}

/*
 * Peer-reviewed papers. Same header rhythm as projects: title and venue first,
 * then authors and the rest of the citation. The title and the external-link
 * icon both open the paper.
 */
export function PublicationList() {
  return (
    <div className="space-y-10 sm:space-y-15">
      {publications.map((paper) => (
        <article key={paper.href}>
          <header className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
            <div className="flex min-w-0 items-start gap-3 sm:gap-5">
              <h3 className="min-w-0 font-serif text-2xl leading-snug sm:text-3xl">
                <a
                  href={paper.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {paper.title}
                </a>
              </h3>
              <a
                href={paper.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${paper.title}`}
                className="mt-1.5 shrink-0 text-ink-muted transition-colors hover:text-accent sm:mt-2"
              >
                <ExternalLinkIcon className="size-5 sm:size-7" />
              </a>
            </div>
            <p className="label text-ink-faint">{paper.venue}</p>
          </header>

          <p className="mt-1.5 text-[0.9375rem] text-ink-muted sm:mt-2 sm:text-base">
            {paper.authors}
          </p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-pretty sm:text-base">
            {paper.details}
          </p>
        </article>
      ))}
    </div>
  );
}
