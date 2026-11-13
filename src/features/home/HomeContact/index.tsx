import { HomeSectionID } from "@/constants/home";
import SectionHeader from "@/features/home/SectionHeader";
import { getFullName } from "@/lib/utils";
import { ContactLinks } from "./ContactLinks";

export const HomeContact = () => {
  return (
    <>
      <SectionHeader text="Contact" id={HomeSectionID.CONTACT} />
      <div className="flex gap-6 justify-evenly flex-col min-h-full w-full border-b-3 border-foreground! bg-primary px-4 py-10 lg:py-20 text-foreground shadow-[3px_3px_3px_color-mix(in_srgb,var(--foreground)_50%,transparent)] lg:flex-row">
        <div className="flex flex-col items-center wrap-break-word px-1 text-2xl gap-2">
          <span>{getFullName()}</span>
          <span className="break-all">lanzangeles100@gmail.com</span>
          <span>226-627-5219</span>
        </div>
        <ContactLinks />
      </div>
    </>
  );
};
