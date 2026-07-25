/*
 * Pill used for project tool stacks and self-hosted services.
 * Renders as a list item, so it always belongs inside a ul.
 */
export function Tag({ children }: { children: string }) {
  return (
    <li className="label rounded-full border border-rule bg-paper-raised px-3 py-1 text-ink-muted">
      {children}
    </li>
  );
}
