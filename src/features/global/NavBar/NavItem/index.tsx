import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
        "no-underline text-nav-foreground hover:text-white [transition:all_500ms,color_100ms,background-color_100ms] text-lg w-auto motion-reduce:transition-none",
        hoverBg && "hover:bg-black/5",
        className,
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavItem;
