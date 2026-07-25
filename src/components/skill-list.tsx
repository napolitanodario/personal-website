import { skills } from "@/content/resume";

export function SkillList() {
  return (
    <dl className="space-y-8">
      {skills.map((group) => (
        <div key={group.label} className="grid gap-2">
          <dt className="label text-ink-faint">{group.label}</dt>
          <dd className="leading-relaxed text-pretty">
            {group.items.join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
