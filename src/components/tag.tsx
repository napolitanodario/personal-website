export function Tag({ children }: { children: string }) {
  return (
    <li className="label rounded-full border border-rule bg-paper-raised px-3 py-1 text-ink-muted">
      {children}
    </li>
  );
}
