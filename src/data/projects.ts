export type Project = {
  title: string;
  domain: string;
  href: string;
  description: string;
  category: string;
  stack: string[];
  impact: string;
};

export const projects: Project[] = [
  {
    title: "Gulf Coast Outfitters",
    domain: "gulfcoastoutfitters.com",
    href: "https://gulfcoastoutfitters.com/",
    description:
      "Built and maintained a responsive WooCommerce site with clean layout structure, optimized assets, and smooth UX across desktop and mobile.",
    category: "Custom WooCommerce",
    stack: ["WordPress", "WooCommerce", "Performance"],
    impact: "Product-focused buying flow"
  },
  {
    title: "CA Flat Fee",
    domain: "caflatfee.com",
    href: "https://caflatfee.com/",
    description:
      "Developed and optimized a real estate WordPress platform with reusable content sections, responsive layouts, and flexible backend management.",
    category: "Real Estate WP Platform",
    stack: ["WordPress", "ACF", "Responsive UI"],
    impact: "Reusable listing content system"
  },
  {
    title: "The Bud Grower",
    domain: "thebudgrower.com",
    href: "https://thebudgrower.com/",
    description:
      "Delivered a WooCommerce experience with product-focused layouts, plugin customization, UI consistency, and better site performance.",
    category: "Custom WooCommerce",
    stack: ["WooCommerce", "Plugin Work", "UX"],
    impact: "Cleaner commerce experience"
  },
  {
    title: "UCSD Community Health",
    domain: "ucsdcommunityhealth.org",
    href: "https://ucsdcommunityhealth.org/",
    description:
      "Engineered a healthcare information site focused on content clarity, publishing reliability, and scalable CMS structure.",
    category: "Performance Optimization",
    stack: ["WordPress", "CMS", "Core Web Vitals"],
    impact: "Reliable healthcare publishing"
  },
  {
    title: "Raydoor",
    domain: "raydoor.com",
    href: "https://raydoor.com/",
    description:
      "Optimized a product-focused web experience with cleaner navigation paths, maintainable backend logic, and better performance metrics.",
    category: "Plugin Development",
    stack: ["PHP", "WordPress", "Optimization"],
    impact: "Improved product discovery"
  },
  {
    title: "G Comfort",
    domain: "gcomfort.com",
    href: "https://www.gcomfort.com/",
    description:
      "Implemented a modern service website with fast page rendering, maintainable component architecture, and clear conversion paths.",
    category: "CMS Build",
    stack: ["WordPress", "Service Site", "SEO"],
    impact: "Fast service discovery"
  },
  {
    title: "Neuvio",
    domain: "neuvio.com",
    href: "https://neuvio.com/",
    description:
      "Developed a polished brand site with lightweight front-end patterns, efficient theme customization, and practical CMS controls.",
    category: "API Integration",
    stack: ["WordPress", "API", "Theme"],
    impact: "Maintainable brand presence"
  },
  {
    title: "Little Rock Printing",
    domain: "littlerockprinting.com",
    href: "https://littlerockprinting.com/",
    description:
      "Delivered a business-ready site with streamlined service discovery, fast rendering, and maintainable CMS blocks.",
    category: "CMS Build",
    stack: ["WordPress", "CMS Blocks", "Performance"],
    impact: "Clearer service journeys"
  },
  {
    title: "Telaeris",
    domain: "telaeris.com",
    href: "https://telaeris.com/",
    description:
      "Engineered a robust product and solutions presence with maintainable architecture, cleaner templates, and faster load times.",
    category: "Plugin Development",
    stack: ["WordPress", "PHP", "Templates"],
    impact: "Scalable product content"
  }
];
