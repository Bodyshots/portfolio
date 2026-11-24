export const HomeSectionID = {
  HOME: "home",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  ABOUT: "about",
  CONTACT: "contact",
} as const;
export type HomeSectionId = (typeof HomeSectionID)[keyof typeof HomeSectionID];
