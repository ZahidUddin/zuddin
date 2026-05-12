import { testimonials } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Testimonials"
          title="Client proof placeholders ready for approved quotes."
          description="Replace these with real testimonials once the client names, roles, and wording are approved for public use."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={`${testimonial.name}-${index}`} delay={index * 0.08}>
              <figure className="glass-card h-full p-6 sm:p-8">
                <blockquote className="text-lg leading-8 text-slate-200">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{testimonial.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
