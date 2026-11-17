import ProjectSection from "../ProjectSection";

interface ProjectDescriptionProps {
  desc: string | null;
}

const ProjectDescription = ({ desc }: ProjectDescriptionProps) => {
  return (
    <ProjectSection
      title="About this project"
      wrapperClassName="my-8 mt-2"
      textClassName="mb-6 text-foreground py-0"
    >
      <p
        className={`m-0 wrap-break-word px-8 text-lg leading-relaxed text-foreground max-xs:px-2 ${desc ? "text-left" : "text-center"}`}
      >
        {desc ? desc : "No long description available"}
      </p>
    </ProjectSection>
  );
};

export default ProjectDescription;
