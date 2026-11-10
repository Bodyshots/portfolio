import { OtherConstants } from "@/constants/other";
import { getFullName } from "@/lib/utils";

const Footer = () => {
  return (
    <div className="m-auto flex w-full min-w-full max-w-full justify-center bg-transparent text-center text-foreground relative p-4">
      Copyright © {OtherConstants.CURR_YEAR} {getFullName()}. Musketeer icon
      created by Flat Icons - Flaticon.
      <br />
      All other rights reserved.
    </div>
  );
};

export default Footer;
