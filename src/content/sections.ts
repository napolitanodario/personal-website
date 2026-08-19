/**
 * The sections of the resume, in the order they appear on the /resume page.
 * One list drives both the navigation in the site header and the anchor
 * ids the resume page scrolls to, so the two can never drift apart.
 */
export type CvSection = {
  /** Anchor id on the /resume page. */
  id: string;
  title: string;
};

export const cvSections: CvSection[] = [
  { id: "work", title: "Work" },
  { id: "projects", title: "Projects" },
  { id: "publications", title: "Publications" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
];

/** Link to a section of the resume page from anywhere in the site. */
export function cvSectionHref(id: string): string {
  return `/resume#${id}`;
}
