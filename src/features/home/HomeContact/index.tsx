import { HomeSectionID } from "@/constants/home";
import SectionHeader from "@/features/home/SectionHeader";
import { ContactLinks } from "./ContactLinks";

export const HomeContact = () => {
  return (
    <>
      <SectionHeader text="Contact" id={HomeSectionID.CONTACT} />
      <div className="min-h-full w-full border-b-3 border-foreground! bg-primary px-4 py-8 text-foreground shadow-[3px_3px_3px_color-mix(in_srgb,var(--color-foreground)_50%,transparent)] sm:px-8">
        <div className="flex w-full flex-col items-center justify-evenly  text-center lg:flex-row">
          <div className="flex w-full max-w-96 items-center justify-center lg:w-2/5 lg:max-w-none">
            <iframe
              className="h-62.5 w-full max-w-150 border-0 lg:max-w-none"
              title="google_maps"
              src={import.meta.env.VITE_GOOGLEMAPS_URL}
              loading="lazy"
            />
          </div>
          <div className="flex w-full items-center justify-center lg:w-1/4">
            <div className="mt-8 flex flex-col items-center justify-center text-center text-xl lg:mt-0">
              <div className="flex flex-col items-center wrap-break-word px-1">
                <span>Lanz Angeles</span>
                <span className="break-all">lanzangeles100@gmail.com</span>
                <span>226-627-5219</span>
              </div>
              <ContactLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
