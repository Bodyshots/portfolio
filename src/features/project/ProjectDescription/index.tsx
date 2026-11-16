import ProjectSection from "../ProjectSection";

interface ProjectDescriptionProps {
  desc: string | null;
}

const ProjectDescription = ({ desc }: ProjectDescriptionProps) => {
  return (
    <ProjectSection
      title="About this project"
      wrapperClassName="my-8 mt-2"
      textClassName="mb-6 text-foreground py-0 text-3xl"
    >
      <p
        className={`px-8 text-lg leading-relaxed text-foreground m-0 ${desc ? "text-left" : "text-center"}`}
      >
        {desc ? desc : "No long description available"}
      </p>
    </ProjectSection>
  );
};

export default ProjectDescription;
