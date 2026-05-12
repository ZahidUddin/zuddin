export type IconName = "code" | "layers" | "blocks" | "gauge" | "workflow";

export type SkillCategory = {
  title: string;
  description: string;
  icon: IconName;
  tools: string[];
};

export const skills: SkillCategory[] = [
  {
    title: "Backend Development",
    description: "Reliable PHP and API foundations for custom CMS and product workflows.",
    icon: "code",
    tools: ["PHP", "OOP", "MySQL", "REST API Integration", "JavaScript", "React.js", "Node.js", "Laravel", "Docker"]
  },
  {
    title: "CMS and Web Platforms",
    description: "Editable, scalable WordPress systems built around real publishing needs.",
    icon: "layers",
    tools: ["WordPress", "Custom Themes", "Custom Plugins", "Gutenberg", "ACF", "Headless WordPress", "Shopify", "Wix", "Webflow"]
  },
  {
    title: "Modular Builds",
    description: "Reusable blocks and builder-based implementations that stay maintainable.",
    icon: "blocks",
    tools: ["Elementor", "Divi", "Avada", "Bricks", "Gutenberg Blocks", "Custom Widget Development"]
  },
  {
    title: "Performance and Infrastructure",
    description: "Speed, caching, delivery, and production tuning for stronger user experience.",
    icon: "gauge",
    tools: ["Core Web Vitals", "Redis / Object Cache", "OPcache", "Cloudflare", "BunnyCDN", "NGINX", "Apache", "PHP-FPM", "Lazy Loading"]
  },
  {
    title: "Tools and Workflow",
    description: "Practical delivery habits across source control, QA, monitoring, and handoff.",
    icon: "workflow",
    tools: ["Git", "Bitbucket", "GitHub", "Lighthouse", "Query Monitor", "New Relic", "WP-CLI", "Figma to WordPress", "Jira", "Confluence"]
  }
];
