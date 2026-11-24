import SectionHeader from "@/features/home/SectionHeader";
import WorkHistory from "@/features/home/WorkHistory";
import { HomeSectionID } from "@/types";

const HomeExperience = () => {
  return (
    <>
      <SectionHeader text="Experience" id={HomeSectionID.EXPERIENCE} />
      <div className="flex justify-center align-center items-center">
        <WorkHistory />
      </div>
    </>
  );
};

export default HomeExperience;
