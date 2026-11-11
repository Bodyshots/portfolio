import { NavItems } from "@/constants/navbar";
import NavItem from "../NavItem";

const CollapsedNavMenu = () => {
  return (
    <div className="collapse-content lg:hidden z-1 pl-0">
      <ul className="menu py-0">
        {NavItems.map(({ path, label, onClick }) => (
          <li key={label}>
            {" "}
            <NavItem path={path} label={label} onClick={() => onClick?.()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollapsedNavMenu;
