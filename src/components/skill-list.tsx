import { skills } from "@/content/resume";

/*
 * Skills, certifications and languages as a definition list: the group name
 * is the term and the flattened list is the description. Kept as running
 * text instead of tags so the section stays quiet next to the projects.
 */
export function SkillList() {
  return (
    <dl className="space-y-8">
      {skills.map((group) => (
        <div key={group.label} className="grid gap-2">
          <dt className="label text-ink-faint">{group.label}</dt>
          <dd className="leading-relaxed text-pretty">
            {group.items.join(", ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
