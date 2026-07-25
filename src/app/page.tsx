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

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <Hero />
        <Section id="work" title="Work">
          <ExperienceList />
        </Section>
        <Section id="projects" title="Projects">
          <ProjectList />
        </Section>
        <Section id="education" title="Education">
          <EducationList />
        </Section>
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
        <Section id="skills" title="Skills">
          <SkillList />
        </Section>
      </main>
      <div className="mx-auto w-full max-w-3xl px-6">
        <SiteFooter />
      </div>
    </>
  );
}
