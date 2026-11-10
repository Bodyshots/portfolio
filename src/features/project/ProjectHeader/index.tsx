import { IoLogoGithub } from "react-icons/io";

interface ProjectHeaderProps {
  title: string;
  shortDesc: string;
  ghLink: string | null;
}

const ProjectHeader = ({ title, shortDesc, ghLink }: ProjectHeaderProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-0 pt-4">
      <h1 className="my-8 text-secondary-foreground text-5xl">{title}</h1>
      <p className="text-lg lg:text-xl my-8 text-muted-foreground font-light">
        {shortDesc}
      </p>
      {ghLink && (
        <a
          href={ghLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-4 rounded-lg p-4 py-2 font-medium no-underline min-w-10 my-8 mt-0 text-input bg-secondary-foreground shadow-md transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-accent hover:text-primary-foreground hover:shadow-[-1px_-1px_1px_color-mix(in_srgb,var(--foreground)_50%,transparent)]"
        >
          <IoLogoGithub className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      )}
    </div>
  );
};

export default ProjectHeader;
