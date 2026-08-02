/*
 * Pill used for project tool stacks and self-hosted services.
 * Renders as a list item, so it always belongs inside a ul.
 */
export function Tag({ children }: { children: string }) {
  return (
    <li className="label rounded-full border border-rule bg-paper-raised px-2 py-0.5 text-ink-muted sm:px-3 sm:py-1">
      {children}
    </li>
  );
}
