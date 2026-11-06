interface ProjectToolProps {
  tool: string;
}

const ProjectTool = ({ tool }: ProjectToolProps) => {
  return (
    <span
      key={crypto.randomUUID()}
      className="text-secondary-foreground inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-accent-very-light-beige border-accent shadow-md"
    >
      {tool}
    </span>
  );
};

export default ProjectTool;
