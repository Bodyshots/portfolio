import { cn, getFullName } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import ScrollIndicator from "../ScrollIndicator";
import CollapsedNavMenu from "./CollapsedNavMenu";
import FullNavMenu from "./FullNavMenu";
import NavItem from "./NavItem";

function NavBar() {
  const navVisibility = useUserStore((state) => state.navVisibility);

  return (
    <div
      className={cn(
        "max-lg:collapse w-full fixed z-99 rounded-none transition-all duration-500",
        navVisibility ? "bg-primary/80 backdrop-blur-xs" : "bg-transparent",
      )}
    >
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        aria-label="Close navigation menu"
        className="fixed inset-0 hidden max-lg:peer-checked:block duration-500 transition-all"
      ></label>
      <div className="collapse-title navbar flex max-lg:justify-between cursor-default py-0">
        <div className="mr-8 p-2">
          <NavItem
            path="/"
            label={getFullName()}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl transition-colors duration-100"
            hoverBg={false}
          />
        </div>
        <label
          htmlFor="navbar-1-toggle"
          className="btn btn-ghost border-0 lg:hidden hover:shadow-lg hover:bg-accent transition-all duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-menu preview-icon"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </label>
        <FullNavMenu />
      </div>
      <CollapsedNavMenu />
      <ScrollIndicator />
    </div>
  );
}

export default NavBar;
