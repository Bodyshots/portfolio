interface NavItem {
  label: string;
  path: string;
  onClick?: () => void;
}

const NavItems: NavItem[] = [
  {
    label: "Home",
    path: "/",
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  { path: "/#projects", label: "Projects" },
  { path: "/#about", label: "About Me" },
  { path: "/#contact", label: "Contact" },
  { path: import.meta.env.VITE_RESUME_URL ?? "", label: "Resume" },
];

const NavConstants = Object.freeze({
  FADE_BREAKPOINT: 780,
});

export { NavConstants, NavItems };
