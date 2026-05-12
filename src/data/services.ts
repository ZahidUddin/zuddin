import type { IconName } from "./skills";

export type Service = {
  title: string;
  description: string;
  icon: IconName;
  outcomes: string[];
};

export const services: Service[] = [
  {
    title: "Custom WordPress Development",
    description:
      "Production-ready themes, plugins, custom post types, Gutenberg blocks, and ACF architectures built for maintainability.",
    icon: "layers",
    outcomes: ["Custom themes", "Custom plugins", "Editable CMS models"]
  },
  {
    title: "WooCommerce and CMS Platforms",
    description:
      "Commerce and content systems with clean templates, reliable plugin behavior, and conversion-focused product journeys.",
    icon: "blocks",
    outcomes: ["Product templates", "Checkout support", "Admin workflows"]
  },
  {
    title: "Performance Optimization",
    description:
      "Core Web Vitals, caching, CDN, image, query, and front-end delivery improvements for faster production sites.",
    icon: "gauge",
    outcomes: ["Speed audits", "Caching setup", "Lighthouse improvements"]
  },
  {
    title: "API and Backend Integration",
    description:
      "PHP backend logic, REST integrations, CRM connections, migration workflows, and custom automation for business systems.",
    icon: "code",
    outcomes: ["REST APIs", "CRM integrations", "Backend automation"]
  }
];
