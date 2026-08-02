import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/*
 * Shared horizontal rhythm for every band of the site: header, main and
 * footer all sit on the same vertical lines. Side padding stays comfortable
 * on phones; on desktop the wider max width uses more of the screen.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-5xl px-5 sm:px-8 md:px-10 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
