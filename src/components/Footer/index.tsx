import { OtherConstants } from "../../constants/other";

const Footer = () => {
  return (
    <div className="m-auto flex w-full min-w-full max-w-full justify-center bg-transparent text-center text-[#61001d] font-['PixelFont',sans-serif] relative pb-4">
      <p>
        Copyright © {OtherConstants.CURR_YEAR} {OtherConstants.FIRST_NAME}{" "}
        {OtherConstants.LAST_NAME}. Musketeer icon created by Flat Icons -
        Flaticon.
        <br />
        All other rights reserved.
      </p>
    </div>
  );
};

export default Footer;
