export type ExperienceItem = {
  company: string;
  role: string;
  range: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Mediusware Ltd",
    role: "Senior Software Engineer",
    range: "March 2024 to Present",
    points: [
      "Lead backend-focused WordPress development for custom themes, plugins, and scalable content platforms.",
      "Build and optimize PHP-based solutions with emphasis on architecture, maintainability, and performance.",
      "Implement advanced caching and delivery using Cloudflare, Redis/Object Cache, and OPcache.",
      "Design dynamic content systems with Gutenberg and ACF for large-scale publishing workflows."
    ]
  },
  {
    company: "BluBird Interactive Ltd",
    role: "Software Engineer",
    range: "April 2022 to March 2024",
    points: [
      "Built custom WordPress themes and plugins with clean PHP, OOP, MySQL, and JavaScript.",
      "Designed backend functionality for custom post types, taxonomies, meta fields, hooks, and queries.",
      "Integrated third-party APIs and connected WordPress platforms with CRM and external systems.",
      "Managed tasks in Agile environments using Jira, Confluence, Bitbucket, and GitHub."
    ]
  },
  {
    company: "Dynamicflow IT",
    role: "Backend Developer (PHP / WordPress)",
    range: "March 2020 to February 2022",
    points: [
      "Developed and maintained custom WordPress websites and plugins with focus on scalability, security, and performance.",
      "Improved Core Web Vitals, SEO, and UX through backend and template-level optimizations.",
      "Customized backend functions and data structures to support diverse client requirements.",
      "Managed multiple concurrent client projects and delivered solutions within deadlines."
    ]
  },
  {
    company: "Northern University",
    role: "Backend Developer",
    range: "February 2018 to March 2020",
    points: [
      "Maintained and optimized multiple university websites, improving uptime, performance, and operational stability.",
      "Developed admission portals using Laravel and Vue.js to streamline enrollment workflows.",
      "Built and configured LMS capabilities and backend modules for institutional platforms.",
      "Resolved defects and delivered continuous improvements to strengthen system reliability."
    ]
  }
];
