import { OtherConstants } from "@/constants/other";
import { getFullName } from "@/lib/utils";

const Footer = () => {
  return (
    <div className="m-auto flex w-full min-w-full max-w-full justify-center bg-transparent text-center text-foreground relative p-4 text-sm">
      Musketeer icon created by Flat Icons - Flaticon. All other rights
      reserved.
      <br />
      Made with HATE and React. Copyright © 2024 - {OtherConstants.CURR_YEAR}{" "}
      {getFullName()}.
    </div>
  );
};

export default Footer;
