import type { Metadata } from "next";

import { Container } from "@/components/container";
import { EducationList } from "@/components/education-list";
import { ExperienceList } from "@/components/experience-list";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillList } from "@/components/skill-list";
import { Tag } from "@/components/tag";
import { profile, selfHosting } from "@/content/resume";

export const metadata: Metadata = {
  title: `Curriculum - ${profile.name}`,
  description: `Work experience, projects, education and skills of ${profile.name}.`,
};

/*
 * The full CV as one long scrollable page. Section ids match the entries in
 * src/content/sections.ts, which is what makes the header anchors land in the
 * right place from this page as well as from the home page.
 */
export default function CurriculumPage() {
  return (
    <>
      <SiteHeader />

      <Container className="flex-1">
        {/* Page title, set apart from the sections that follow. */}
        <header className="py-16 md:py-20">
          <p className="label text-accent">{profile.role}</p>
          <h1 className="mt-5 font-serif text-5xl uppercase tracking-tight sm:text-6xl">
            Curriculum
          </h1>
        </header>

        <main>
          {/* Professional experience, most recent first. */}
          <Section id="work" title="Work">
            <ExperienceList />
          </Section>

          {/* Academic and personal projects with their tool stacks. */}
          <Section id="projects" title="Projects">
            <ProjectList />
          </Section>

          {/* Degrees and coursework. */}
          <Section id="education" title="Education">
            <EducationList />
          </Section>

          {/* Services running on the home server, listed as tags. */}
          <Section id="selfhosting" title="Self-hosting">
            <p className="leading-relaxed text-ink-muted text-pretty">
              A Raspberry Pi 4 at home runs a small set of services I use every
              day, each in its own container behind a single reverse proxy.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {selfHosting.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </ul>
          </Section>

          {/* Grouped skills, languages and certifications. */}
          <Section id="skills" title="Skills">
            <SkillList />
          </Section>
        </main>

        {/* Closing call to action, also the target of the Contact anchor. */}
        <SiteFooter />
      </Container>
    </>
  );
}
