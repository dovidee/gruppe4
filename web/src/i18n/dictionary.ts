import type { Locale } from "./config";

// Interface text that belongs to the site, not to the content. Everything an
// editor writes lives in Sanity; these are labels, controls and fallbacks.

const no = {
  skipToContent: "Hopp til innhold",
  homeLink: "resonansIT, til forsiden",
  mainNav: "Hovedmeny",
  menuOpen: "Vis meny",
  menuClose: "Skjul meny",
  switchLanguage: "Switch to English",
  switchLanguageShort: "EN",
  themeToDark: "Bytt til mørkt tema",
  themeToLight: "Bytt til lyst tema",

  playVideo: "Spill av videoen",
  downloadVideo: "Last ned videoen",
  captionsLabel: "Norsk",

  partnersLead: "I samarbeid med",
  partnersFallback: ["Universitetet i Agder", "Sør-Tre"],

  membersLede: "Vi utfordrer hverandres ideer for å komme frem til de beste løsningene.",
  skillCan: "Kan",
  skillLearning: "Lærer",
  learningLegend: "Stiplet: vil lære",
  onLinkedIn: (name: string) => `${name} på LinkedIn`,
  onGitHub: (name: string) => `${name} på GitHub`,
  emailTo: (name: string) => `Send e-post til ${name}`,
  projectsBy: (name: string) => `Prosjekter av ${name}`,
  previousProject: "Forrige prosjekt",
  nextProject: "Neste prosjekt",
  showProject: (title: string) => `Vis ${title}`,
  carouselHint: "Dra for å bla",

  offerHeading: "Har du en utfordring vi kan løse sammen?",
  offerCtas: ["Se prosjekter", "Les bloggen vår", "Ta kontakt!"],

  university: "Universitetet i Agder",
  footerTagline: "Det som ikke knekker koden, gjør den sterkere.",

  projectsHeading: "Fra oppgave til ferdig kode.",
  filterProjects: "Filtrer prosjekter",
  allCategories: "Alle",
  categories: { web: "Web", data: "Data", sikkerhet: "Sikkerhet" } as Record<string, string>,
  madeBy: "Laget av",
  and: "og",
  codeBy: (name: string) => `${name} sin kode på GitHub`,
  viewOnGitHub: "Se på GitHub",
  moreInfo: "Mer info",
  noProjects: "Ingen prosjekter i denne kategorien",

  blogHeading: "Notater fra bachelorprosjektet.",
  blogCategories: "Kategorier",
  morePosts: "Flere innlegg",
  readPost: "Les innlegget",
  noPosts: "Ingen innlegg ennå",
  noPostsInCategory: "Ingen innlegg i denne kategorien",

  contactHeading: "Ta kontakt",
  contactJump: "Til kontaktskjemaet",
  contactLede: "Send oss en melding, så hører du fra oss.",
  formName: "Navn",
  formEmail: "E-post",
  formMessage: "Melding",
  formSubmit: "Send melding",

  thanksTitle: "Takk for meldingen",
  thanksHeading: "Takk for meldingen!",
  thanksLede: "Vi har mottatt meldingen din, og svarer så snart vi kan.",
  thanksBack: "Tilbake til forsiden",
  waitHeading: "Vent litt før du sender igjen",
  waitLede: "Du har sendt flere meldinger på kort tid. Prøv igjen om ti minutter.",
  errorHeading: "Meldingen kom ikke fram",
  errorLede: "Noe gikk galt da vi skulle sende meldingen din. Prøv gjerne igjen.",
  backToForm: "Tilbake til skjemaet",

  notFoundHeading: "Siden ble ikke funnet",
  notFoundBody: "Siden du leter etter finnes ikke.",
  notFoundBack: "Til forsiden",
};

export type Dictionary = typeof no;

const en: Dictionary = {
  skipToContent: "Skip to content",
  homeLink: "resonansIT, home",
  mainNav: "Main menu",
  menuOpen: "Show menu",
  menuClose: "Hide menu",
  switchLanguage: "Bytt til norsk",
  switchLanguageShort: "NO",
  themeToDark: "Switch to dark theme",
  themeToLight: "Switch to light theme",

  playVideo: "Play the video",
  downloadVideo: "Download the video",
  captionsLabel: "Norwegian",

  partnersLead: "In partnership with",
  partnersFallback: ["University of Agder", "Sør-Tre"],

  membersLede: "We challenge each other's ideas to arrive at the best solutions.",
  skillCan: "Knows",
  skillLearning: "Learning",
  learningLegend: "Dashed: want to learn",
  onLinkedIn: (name) => `${name} on LinkedIn`,
  onGitHub: (name) => `${name} on GitHub`,
  emailTo: (name) => `Email ${name}`,
  projectsBy: (name) => `Projects by ${name}`,
  previousProject: "Previous project",
  nextProject: "Next project",
  showProject: (title) => `Show ${title}`,
  carouselHint: "Drag to browse",

  offerHeading: "Got a challenge we could solve together?",
  offerCtas: ["See projects", "Read our blog", "Get in touch!"],

  university: "University of Agder",
  footerTagline: "What doesn't break the code makes it stronger.",

  projectsHeading: "From assignment to working code.",
  filterProjects: "Filter projects",
  allCategories: "All",
  categories: { web: "Web", data: "Data", sikkerhet: "Security" },
  madeBy: "Made by",
  and: "and",
  codeBy: (name) => `${name}'s code on GitHub`,
  viewOnGitHub: "View on GitHub",
  moreInfo: "Details",
  noProjects: "No projects in this category",

  blogHeading: "Notes from the bachelor project.",
  blogCategories: "Categories",
  morePosts: "More posts",
  readPost: "Read post",
  noPosts: "No posts yet",
  noPostsInCategory: "No posts in this category",

  contactHeading: "Get in touch",
  contactJump: "Go to the contact form",
  contactLede: "Send us a message and we will get back to you.",
  formName: "Name",
  formEmail: "Email",
  formMessage: "Message",
  formSubmit: "Send message",

  thanksTitle: "Thanks for your message",
  thanksHeading: "Thanks for your message!",
  thanksLede: "We have received your message and will reply as soon as we can.",
  thanksBack: "Back to the home page",
  waitHeading: "Wait a moment before sending again",
  waitLede: "You have sent several messages in a short time. Try again in ten minutes.",
  errorHeading: "Your message did not get through",
  errorLede: "Something went wrong while sending your message. Please try again.",
  backToForm: "Back to the form",

  notFoundHeading: "Page not found",
  notFoundBody: "The page you are looking for does not exist.",
  notFoundBack: "Go to the home page",
};

export const dictionaries: Record<Locale, Dictionary> = { no, en };
