import { GenIcon, type IconType } from "react-icons";
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
  LuServer,
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
  SiPfsense,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSanity,
  SiShopify,
  SiSplunk,
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

// Logos react-icons lacks (PowerShell only as an outline), drawn as
// single-colour icons like the rest.
// Pico CSS: its sparkle mark (svg-logos, CC0). PowerShell: Devicon (MIT).
// Active Directory: the Entra ID (formerly Azure AD) mark, with its facets
// as opacity steps instead of shades of blue.
const PicoCss = GenIcon({
  tag: "svg",
  attr: { viewBox: "382 -5 131 131" },
  child: [
    { tag: "path", attr: { d: "M482.7 73.402a2.7 2.7 0 0 0-1.558 1.558l-10.6 27.561c-.893 2.32-4.173 2.32-5.066 0l-10.6-27.56a2.7 2.7 0 0 0-1.559-1.559l-27.56-10.6c-2.319-.892-2.319-4.173 0-5.065l27.56-10.6a2.7 2.7 0 0 0 1.56-1.558l10.6-27.561c.892-2.32 4.172-2.32 5.065 0l10.6 27.56a2.7 2.7 0 0 0 1.558 1.559l27.561 10.6c2.319.892 2.319 4.173 0 5.065z" }, child: [] },
    { tag: "path", attr: { d: "M405.427 37.407c-.892 2.319-4.172 2.319-5.065 0l-3.817-9.926a2.7 2.7 0 0 0-1.56-1.558l-9.925-3.818c-2.318-.892-2.318-4.172 0-5.064l9.926-3.818a2.7 2.7 0 0 0 1.559-1.558l3.817-9.926c.893-2.319 4.173-2.319 5.065 0l3.818 9.926a2.7 2.7 0 0 0 1.558 1.558l9.926 3.818c2.318.892 2.318 4.172 0 5.064l-9.926 3.818a2.7 2.7 0 0 0-1.558 1.558zm21.655 69.909a2.7 2.7 0 0 0-1.559 1.558l-3.817 9.926c-.893 2.319-4.173 2.319-5.066 0l-3.817-9.926a2.7 2.7 0 0 0-1.559-1.558l-9.925-3.818c-2.319-.892-2.319-4.172 0-5.064l9.925-3.818a2.7 2.7 0 0 0 1.56-1.558l3.816-9.926c.893-2.319 4.173-2.319 5.066 0l3.817 9.926a2.7 2.7 0 0 0 1.559 1.558l9.926 3.818c2.318.892 2.318 4.172 0 5.064z" }, child: [] },
  ],
});
const PowerShell = GenIcon({
  tag: "svg",
  attr: { viewBox: "0 0 128 128" },
  child: [
    { tag: "path", attr: { fillRule: "evenodd", d: "M124.912 19.358c-.962-1.199-2.422-1.858-4.111-1.858h-92.61c-3.397 0-6.665 2.642-7.444 6.015L2.162 104.022c-.396 1.711-.058 3.394.926 4.619c.963 1.199 2.423 1.858 4.111 1.858v.001H99.81c3.396 0 6.665-2.643 7.443-6.016l18.586-80.508c.395-1.711.057-3.395-.927-4.618m-98.589 77.17c-1.743-2.397-1.323-5.673.94-7.318l37.379-27.067v-.556L41.157 36.603c-1.916-2.038-1.716-5.333.445-7.361s5.466-2.019 7.382.019l28.18 29.979c1.6 1.702 1.718 4.279.457 6.264c-.384.774-1.182 1.628-2.593 2.618l-41.45 29.769c-2.263 1.644-5.512 1.034-7.255-1.363m59.543.538H63.532c-2.597 0-4.702-2.082-4.702-4.65s2.105-4.65 4.702-4.65h22.333c2.597 0 4.702 2.082 4.702 4.65s-2.104 4.65-4.701 4.65" }, child: [] },
  ],
});
const ActiveDirectory = GenIcon({
  tag: "svg",
  attr: { viewBox: "0 0 512 512" },
  child: [
    { tag: "path", attr: { fillOpacity: "0.75", d: "M108.1 399.1c11 6.9 29.4 14.5 48.8 14.5c17.7 0 34.1-5.1 47.7-13.9h.1l51.3-32.1v115.9c-8.1 0-16.3-2.2-23.4-6.7c0 .1-124.5-77.7-124.5-77.7" }, child: [] },
    { tag: "path", attr: { fillOpacity: "0.55", d: "M223.4 42.9L10 283.5c-16.5 18.6-12.2 46.7 9.2 60c0 0 79 49.4 88.9 55.6c11 6.9 29.4 14.5 48.8 14.5c17.7 0 34.1-5.1 47.7-13.9h.1l51.3-32.1L131.9 290L256 150V28.4c-12 0-24.1 4.9-32.6 14.5" }, child: [] },
    { tag: "path", attr: { fillOpacity: "0.3", d: "m131.9 290.1l1.4.9L256 367.7V150z" }, child: [] },
    { tag: "path", attr: { d: "M492.8 343.6c21.4-13.3 25.7-41.4 9.2-60l-140-158c-11.3-5.3-24-8.3-37.3-8.3c-26.3 0-49.8 11.3-65.5 29.2l-3.1 3.5l124.1 140.1L256 367.7v115.9c8.2 0 16.3-2.2 23.4-6.7z" }, child: [] },
    { tag: "path", attr: { fillOpacity: "0.8", d: "M256 28.4V150l3.1-3.5c15.6-17.8 39.2-29.2 65.5-29.2c13.4 0 26.1 3 37.3 8.3l-73.4-82.7c-8.4-9.6-20.5-14.4-32.5-14.5" }, child: [] },
    { tag: "path", attr: { fillOpacity: "0.45", d: "M380.2 290.1L256 150.1v217.6z" }, child: [] },
  ],
});

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
  "active directory": {
    Icon: ActiveDirectory,
    color: "oklch(56.8% 0.167 251.3)",
    label: { no: "Active Directory", en: "Active Directory" },
  },
  iis: { Icon: LuServer, color: ROYAL, label: { no: "IIS", en: "IIS" } },
  picocss: { Icon: PicoCss, color: "oklch(76.5% 0.175 62.6)", label: { no: "PicoCSS", en: "PicoCSS" } },
  powershell: {
    Icon: PowerShell,
    color: "oklch(66.8% 0.174 260.8)",
    label: { no: "PowerShell", en: "PowerShell" },
  },
  pfsense: { Icon: SiPfsense, color: "oklch(55% 0 0)", label: { no: "pfSense", en: "pfSense" } },
  splunk: { Icon: SiSplunk, color: "oklch(55% 0 0)", label: { no: "Splunk", en: "Splunk" } },
};

const FALLBACK = { Icon: LuSparkles, color: ROYAL };

export function skillIcon(name: string): SkillIcon {
  const found = ICONS[name.trim().toLowerCase()];
  return found ?? { ...FALLBACK, label: { no: name, en: name } };
}
