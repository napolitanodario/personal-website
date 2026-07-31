/**
 * The sections of the CV, in the order they appear on the /cv page.
 * One list drives both the navigation in the site header and the anchor
 * ids the CV page scrolls to, so the two can never drift apart.
 */
export type CvSection = {
  /** Anchor id on the /cv page. */
  id: string;
  title: string;
};

export const cvSections: CvSection[] = [
  { id: "work", title: "Work" },
  { id: "projects", title: "Projects" },
  { id: "education", title: "Education" },
  { id: "selfhosting", title: "Self-hosting" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

/** Link to a section of the CV page from anywhere in the site. */
export function cvSectionHref(id: string): string {
  return `/cv#${id}`;
}
