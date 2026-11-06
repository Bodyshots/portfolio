import SectionHeader from "@/features/home/SectionHeader";
import WorkHistory from "@/features/home/WorkHistory";

const HomeExperience = () => {
  return (
    <>
      <SectionHeader text="Experience" />
      <div className="flex justify-center align-center items-center m-6">
        <WorkHistory />
      </div>
    </>
  );
};

export default HomeExperience;
