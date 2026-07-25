import { EducationList } from "@/components/education-list";
import { ExperienceList } from "@/components/experience-list";
import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillList } from "@/components/skill-list";
import { Tag } from "@/components/tag";
import { selfHosting } from "@/content/resume";

/*
 * The whole portfolio is a single scrollable page. Every block below is
 * a named anchor that the header navigation links to. Content comes from
 * src/content/resume.ts, so this file only decides order and layout.
 */
export default function Home() {
  return (
    <>
      {/* Sticky bar: name, anchor navigation and theme toggle. */}
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        {/* Opening statement: role, name and contact links. */}
        <Hero />

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

      {/* Closing call to action and contact details. */}
      <div className="mx-auto w-full max-w-3xl px-6">
        <SiteFooter />
      </div>
    </>
  );
}
