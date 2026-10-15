import { OtherConstants } from "../../constants/other";

const Footer = () => {
  return (
    <div className="m-auto flex w-full min-w-full max-w-full justify-center bg-[linear-gradient(7deg,#dec796_15%,#e5ddac_90%)] p-[0.75em] text-center text-[#61001d] font-['PixelFont',sans-serif] relative">
      <p className="m-0 opacity-80">
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
