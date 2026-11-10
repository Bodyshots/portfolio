import { type ChangeEvent, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItems } from "@/constants/navbar";
import { cn, getFullName } from "@/lib/utils";
import {
  setNavOpaque,
  setNavTransparent,
  useUserStore,
} from "@/store/useUserStore";
import ScrollIndicator from "../ScrollIndicator";

interface NavItemProps {
  path: string;
  label: string;
  hoverBg?: boolean;
  className?: string;
  onClick?: () => void;
}

const NavItem = ({
  path,
  label,
  className,
  onClick,
  hoverBg = true,
}: NavItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "no-underline text-accent hover:text-white transition-all text-lg w-auto",
        hoverBg && "hover:bg-black/5",
        className,
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

function NavBar() {
  const { pathname } = useLocation();
  const navVisibility = useUserStore((state) => state.navVisibility);
  const isHomePage = pathname === "/" || pathname === "/home";
  const isOpaque = navVisibility || !isHomePage;
  const navVisibilityBeforeMenu = useRef(isOpaque);
  const restoreNavVisibility = () => {
    if (navVisibilityBeforeMenu.current || !isHomePage) setNavOpaque();
    else setNavTransparent();
  };

  const handleMenuToggle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      navVisibilityBeforeMenu.current = isOpaque;
      setNavOpaque();
    } else {
      restoreNavVisibility();
    }
  };

  const closeMenu = () => {
    const menuToggle = document.getElementById(
      "navbar-1-toggle",
    ) as HTMLInputElement | null;
    if (menuToggle?.checked) {
      menuToggle.checked = false;
      restoreNavVisibility();
    }
  };

  return (
    <div
      className={cn(
        "max-lg:collapse w-full fixed z-99 rounded-none transition-all duration-300",
        isOpaque ? "bg-primary/80 backdrop-blur-xs" : "bg-transparent",
      )}
    >
      <input
        id="navbar-1-toggle"
        className="peer hidden"
        type="checkbox"
        onChange={handleMenuToggle}
      />
      <label
        htmlFor="navbar-1-toggle"
        aria-label="Close navigation menu"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar flex max-lg:justify-between cursor-default py-0">
        <div className="mr-8 p-2">
          <NavItem
            path="/"
            label={getFullName()}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl"
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

        {/* Desktop view */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {NavItems.map(({ path, label, onClick }) => (
              <li key={label}>
                <NavItem
                  path={path}
                  label={label}
                  onClick={() => {
                    onClick?.();
                    closeMenu();
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile (collapsed) Dropdown */}
      <div className="collapse-content lg:hidden z-1 pl-0">
        <ul className="menu py-0">
          {NavItems.map(({ path, label, onClick }) => (
            <li key={label}>
              {" "}
              <NavItem
                path={path}
                label={label}
                onClick={() => {
                  onClick?.();
                  closeMenu();
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <ScrollIndicator />
    </div>
  );
}

export default NavBar;
