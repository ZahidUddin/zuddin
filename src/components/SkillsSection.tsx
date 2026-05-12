import { skills } from "@/data/skills";
import { SectionHeader } from "./SectionHeader";
import { SkillCard } from "./SkillCard";

export function SkillsSection() {
  return (
    <section id="skills" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Skills"
          title="A practical stack for scalable WordPress and PHP delivery."
          description="The focus is not only shipping pages, but building maintainable systems that editors, marketers, and engineering teams can keep improving."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
