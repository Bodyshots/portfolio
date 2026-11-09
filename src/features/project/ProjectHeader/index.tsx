import { IoLogoGithub } from "react-icons/io";

interface ProjectHeaderProps {
  title: string;
  shortDesc: string;
  ghLink: string | null;
}

const ProjectHeader = ({ title, shortDesc, ghLink }: ProjectHeaderProps) => {
  return (
    <div className="bg-accent-light-beige max-w-6xl mx-auto px-4 py-8 pb-0 pt-4">
      <h1 className="my-8 text-secondary-foreground text-5xl">{title}</h1>
      <p className="text-lg lg:text-xl my-8 text-muted-foreground font-light">
        {shortDesc}
      </p>

      {ghLink && (
        <a
          href={ghLink}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-input inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 bg-secondary-foreground p-4 shadow-md hover:bg-primary-medium hover:transition-all hover:duration-100 flex-wrap gap-4 justify-center my-8 mt-0"
        >
          <IoLogoGithub className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      )}
    </div>
  );
};

export default ProjectHeader;
