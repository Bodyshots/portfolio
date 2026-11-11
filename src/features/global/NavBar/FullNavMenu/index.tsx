import { NavItems } from "@/constants/navbar";
import NavItem from "../NavItem";

const FullNavMenu = () => {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {NavItems.map(({ path, label, onClick }) => (
          <li key={label}>
            <NavItem path={path} label={label} onClick={() => onClick?.()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FullNavMenu;
