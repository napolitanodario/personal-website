import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/*
 * Shared horizontal rhythm for every band of the site: header, main and
 * footer all sit on the same vertical lines. The generous side padding is
 * deliberate, it keeps text well away from the edges of the viewport.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-4xl px-8 sm:px-10 md:px-14 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
