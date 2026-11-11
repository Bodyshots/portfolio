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

export default NavItem;
