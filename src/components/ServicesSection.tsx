import { services } from "@/data/services";
import { SectionHeader } from "./SectionHeader";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section id="services" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Services"
          title="Focused services for WordPress teams and founders."
          description="From new builds to performance rescue work, each engagement is scoped around clean implementation, clear ownership, and measurable improvement."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
