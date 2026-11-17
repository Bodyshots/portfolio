import { HomeSectionID } from "@/constants/home";
import SectionHeader from "@/features/home/SectionHeader";
import WorkHistory from "@/features/home/WorkHistory";

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
