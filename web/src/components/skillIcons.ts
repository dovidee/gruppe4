import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import { GiSpikedDragonHead } from "react-icons/gi";
import {
  LuBadgeCheck,
  LuBox,
  LuBrainCircuit,
  LuCode,
  LuDatabase,
  LuFlaskConical,
  LuGlobe,
  LuMonitor,
  LuNetwork,
  LuPenTool,
  LuPuzzle,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
  LuVideo,
} from "react-icons/lu";
import {
  SiCss,
  SiDocker,
  SiDotnet,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiLeaflet,
  SiLinux,
  SiMariadb,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSanity,
  SiShopify,
  SiTailwindcss,
  SiTypescript,
  SiWebassembly,
  SiXampp,
} from "react-icons/si";
import { TbBrandAzure, TbBrandCSharp, TbSql } from "react-icons/tb";

export type SkillIcon = {
  Icon: IconType;
  // Hover colour: the tool's own brand colour where it has one, otherwise a
  // palette colour. OKLCH, like the rest of the site.
  color: string;
  label: { no: string; en: string };
};

const ROYAL = "oklch(60% 0.19 265.4)";

// Keys are lower-cased skill names as editors type them in Sanity. Skills
// without a recognisable logo get the closest everyday symbol.
const ICONS: Record<string, SkillIcon> = {
  "c#": { Icon: TbBrandCSharp, color: "oklch(52% 0.17 318.7)", label: { no: "C#", en: "C#" } },
  docker: { Icon: SiDocker, color: "oklch(65.5% 0.161 247.5)", label: { no: "Docker", en: "Docker" } },
  databasesystemer: {
    Icon: LuDatabase,
    color: ROYAL,
    label: { no: "Databasesystemer", en: "Database systems" },
  },
  sql: { Icon: TbSql, color: "oklch(64% 0.15 230)", label: { no: "SQL", en: "SQL" } },
  cybersikkerhet: {
    Icon: LuShieldCheck,
    color: "oklch(66% 0.16 150)",
    label: { no: "Cybersikkerhet", en: "Cybersecurity" },
  },
  ai: { Icon: LuBrainCircuit, color: "oklch(64% 0.2 300)", label: { no: "AI", en: "AI" } },
  html: { Icon: SiHtml5, color: "oklch(62.5% 0.191 35.7)", label: { no: "HTML", en: "HTML" } },
  php: { Icon: SiPhp, color: "oklch(60.3% 0.087 280.4)", label: { no: "PHP", en: "PHP" } },
  xampp: { Icon: SiXampp, color: "oklch(71.8% 0.181 48.5)", label: { no: "XAMPP", en: "XAMPP" } },
  design: { Icon: LuPenTool, color: "oklch(66% 0.2 350)", label: { no: "Design", en: "Design" } },
  shopify: {
    Icon: SiShopify,
    color: "oklch(71.2% 0.136 136)",
    label: { no: "Shopify", en: "Shopify" },
  },
  "video editing": {
    Icon: LuVideo,
    color: "oklch(64% 0.21 25)",
    label: { no: "Videoredigering", en: "Video editing" },
  },
  problemløsning: {
    Icon: LuPuzzle,
    color: "oklch(72% 0.15 75)",
    label: { no: "Problemløsning", en: "Problem solving" },
  },
  it: { Icon: LuMonitor, color: ROYAL, label: { no: "IT", en: "IT" } },
  teamwork: { Icon: LuUsers, color: "oklch(68% 0.14 200)", label: { no: "Teamarbeid", en: "Teamwork" } },
  programmering: {
    Icon: LuCode,
    color: "oklch(66% 0.17 285)",
    label: { no: "Programmering", en: "Programming" },
  },
  "organisasjonelle ferdigheter": {
    Icon: LuNetwork,
    color: "oklch(68% 0.12 180)",
    label: { no: "Organisasjonelle ferdigheter", en: "Organisational skills" },
  },
  kvalitetsikring: {
    Icon: LuBadgeCheck,
    color: "oklch(68% 0.16 145)",
    label: { no: "Kvalitetssikring", en: "Quality assurance" },
  },
  kvalitetssikring: {
    Icon: LuBadgeCheck,
    color: "oklch(68% 0.16 145)",
    label: { no: "Kvalitetssikring", en: "Quality assurance" },
  },
  webutvikling: {
    Icon: LuGlobe,
    color: "oklch(64% 0.16 245)",
    label: { no: "Webutvikling", en: "Web development" },
  },
  git: { Icon: SiGit, color: "oklch(64.9% 0.201 32.8)", label: { no: "Git", en: "Git" } },
  linux: { Icon: SiLinux, color: "oklch(85.1% 0.167 87.7)", label: { no: "Linux", en: "Linux" } },
  python: { Icon: SiPython, color: "oklch(62% 0.12 246.7)", label: { no: "Python", en: "Python" } },
  virtualbox: {
    Icon: LuBox,
    color: "oklch(58% 0.12 253.7)",
    label: { no: "VirtualBox", en: "VirtualBox" },
  },
  aws: { Icon: FaAws, color: "oklch(77.2% 0.174 64.6)", label: { no: "AWS", en: "AWS" } },
  azure: { Icon: TbBrandAzure, color: "oklch(60% 0.167 251.3)", label: { no: "Azure", en: "Azure" } },
  kubernetes: {
    Icon: SiKubernetes,
    color: "oklch(60% 0.194 262.6)",
    label: { no: "Kubernetes", en: "Kubernetes" },
  },
  rust: { Icon: SiRust, color: "oklch(62% 0.18 31.9)", label: { no: "Rust", en: "Rust" } },
  ghidra: {
    Icon: GiSpikedDragonHead,
    color: "oklch(62% 0.2 25)",
    label: { no: "Ghidra", en: "Ghidra" },
  },
  webassembly: {
    Icon: SiWebassembly,
    color: "oklch(58% 0.23 282)",
    label: { no: "WebAssembly", en: "WebAssembly" },
  },

  // Project stacks
  "asp.net core": {
    Icon: SiDotnet,
    color: "oklch(52% 0.2 300)",
    label: { no: "ASP.NET Core", en: "ASP.NET Core" },
  },
  ".net": { Icon: SiDotnet, color: "oklch(52% 0.2 300)", label: { no: ".NET", en: ".NET" } },
  leaflet: { Icon: SiLeaflet, color: "oklch(68% 0.17 135)", label: { no: "Leaflet", en: "Leaflet" } },
  tailwind: {
    Icon: SiTailwindcss,
    color: "oklch(72% 0.13 215)",
    label: { no: "Tailwind", en: "Tailwind" },
  },
  tailwindcss: {
    Icon: SiTailwindcss,
    color: "oklch(72% 0.13 215)",
    label: { no: "Tailwind CSS", en: "Tailwind CSS" },
  },
  moq: { Icon: LuFlaskConical, color: "oklch(66% 0.16 150)", label: { no: "Moq (testing)", en: "Moq (testing)" } },
  mariadb: { Icon: SiMariadb, color: "oklch(55% 0.09 60)", label: { no: "MariaDB", en: "MariaDB" } },
  mysql: { Icon: SiMysql, color: "oklch(55% 0.1 230)", label: { no: "MySQL", en: "MySQL" } },
  postgresql: {
    Icon: SiPostgresql,
    color: "oklch(52% 0.1 255)",
    label: { no: "PostgreSQL", en: "PostgreSQL" },
  },
  css: { Icon: SiCss, color: "oklch(55% 0.18 270)", label: { no: "CSS", en: "CSS" } },
  javascript: {
    Icon: SiJavascript,
    color: "oklch(88% 0.17 100)",
    label: { no: "JavaScript", en: "JavaScript" },
  },
  typescript: {
    Icon: SiTypescript,
    color: "oklch(55% 0.13 250)",
    label: { no: "TypeScript", en: "TypeScript" },
  },
  react: { Icon: SiReact, color: "oklch(80% 0.12 215)", label: { no: "React", en: "React" } },
  "next.js": { Icon: SiNextdotjs, color: "oklch(55% 0 0)", label: { no: "Next.js", en: "Next.js" } },
  sanity: { Icon: SiSanity, color: "oklch(60% 0.2 25)", label: { no: "Sanity", en: "Sanity" } },
};

const FALLBACK = { Icon: LuSparkles, color: ROYAL };

export function skillIcon(name: string): SkillIcon {
  const found = ICONS[name.trim().toLowerCase()];
  return found ?? { ...FALLBACK, label: { no: name, en: name } };
}
