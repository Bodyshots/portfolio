import { lazy } from "react";
import { HomeSectionID } from "@/constants/home";
import SectionHeader from "../SectionHeader";

const HomeCoin = lazy(() => import("../HomeCoin"));

const HomeAbout = () => {
  return (
    <>
      <SectionHeader text="About" id={HomeSectionID.ABOUT} />
      <div
        className="flex flex-col justify-between align-center m-auto min-h-full py-4 px-0 lg:flex-row lg:flex-wrap gap-2
      bg-[radial-gradient(circle_at_50%_85%,color-mix(in_srgb,var(--accent)_55%,transparent)_15%,var(--primary)_65%,var(--primary)_65%)]
      lg:bg-[radial-gradient(circle_at_85%_center,color-mix(in_srgb,var(--accent)_55%,transparent)_15%,var(--primary)_65%,var(--primary)_65%)]"
      >
        <div className="flex flex-col flex-nowrap justify-between text-foreground m-8 h-full self-center lg:w-1/2">
          <span className="text-6xl h-1/5 p-2 text-center mb-4 lg:text-left">
            Welcome to my website!
          </span>
          <div className="w-full h-full text-2xl text-foreground shadow-md shadow-black/50 bg-primary border-secondary p-4 rounded-lg">
            Hi! I'm Lanz, a full-stack developer that's recently graduated with
            a Computer Science (CS) and Applied Statistics major (and a minor in
            Mathematics)!
            <br />
            <br />
            I've previously worked as a Research Assistant, teaching hundreds of
            1st and 2nd year students foundational skills to help them on their
            journey through CS. Currently, I've been working on creating web
            applications while dabbling a little bit into AI, being eager to
            make my mark on the industry.
            <br />
            <br />
            <div className="flex text-center">
              Want to connect? Scroll down below to take a look at my socials.
              Hope to chat with you soon!
            </div>
          </div>
        </div>
        <HomeCoin />
      </div>
    </>
  );
};

export default HomeAbout;
