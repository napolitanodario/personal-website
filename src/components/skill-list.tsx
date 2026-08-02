import { skills } from "@/content/resume";
import type { SkillItem } from "@/content/resume";

function skillLabel(item: SkillItem): string {
  return typeof item === "string" ? item : item.label;
}

/*
 * Skills, certifications and languages as a definition list: the group name
 * is the term and the flattened list is the description. Kept as running
 * text instead of tags so the section stays quiet next to the projects.
 */
export function SkillList() {
  return (
    <dl className="space-y-6 sm:space-y-8">
      {skills.map((group) => (
        <div key={group.label} className="grid gap-1.5 sm:gap-2">
          <dt className="label text-ink-faint">{group.label}</dt>
          <dd className="text-[0.9375rem] leading-relaxed text-pretty sm:text-base">
            {group.items.map((item, index) => (
              <span key={skillLabel(item)}>
                {index > 0 ? ", " : null}
                {typeof item === "string" ? (
                  item
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {item.label}
                  </a>
                )}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
