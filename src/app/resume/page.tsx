import type { Metadata } from "next";

import { Container } from "@/components/container";
import { EducationList } from "@/components/education-list";
import { ExperienceList } from "@/components/experience-list";
import { ProjectList } from "@/components/project-list";
import { PublicationList } from "@/components/publication-list";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillList } from "@/components/skill-list";
import { profile } from "@/content/resume";

export const metadata: Metadata = {
  title: `Resume - ${profile.name}`,
  description: `Work experience, projects, publications, education and skills of ${profile.name}.`,
};

/*
 * The full resume as one long scrollable page. Section ids match the entries in
 * src/content/sections.ts, which is what makes the header anchors land in the
 * right place from this page as well as from the home page.
 */
export default function ResumePage() {
  return (
    <>
      <SiteHeader />

      <Container className="flex-1">
        <main>
          {/* Professional experience, most recent first. */}
          <Section id="work" title="Work">
            <ExperienceList />
          </Section>

          {/* Academic and personal projects with their tool stacks. */}
          <Section id="projects" title="Projects">
            <ProjectList />
          </Section>

          {/* Peer-reviewed papers. */}
          <Section id="publications" title="Publications">
            <PublicationList />
          </Section>

          {/* Degrees and coursework. */}
          <Section id="education" title="Education">
            <EducationList />
          </Section>

          {/* Grouped skills, languages and certifications. */}
          <Section id="skills" title="Skills">
            <SkillList />
          </Section>
        </main>
      </Container>

      <SiteFooter />
    </>
  );
}
