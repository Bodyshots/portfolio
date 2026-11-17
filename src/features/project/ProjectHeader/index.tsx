import { IoLogoGithub } from "react-icons/io";

interface ProjectHeaderProps {
  title: string;
  shortDesc: string;
  ghLink: string | null;
}

const ProjectHeader = ({ title, shortDesc, ghLink }: ProjectHeaderProps) => {
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8 pb-0 pt-4 max-xs:px-2">
      <h1 className="my-8 wrap-break-word text-5xl text-foreground max-xs:text-5xl">
        {title}
      </h1>
      <p className="my-8 wrap-break-word font-light text-foreground text-xl">
        {shortDesc}
      </p>
      {ghLink && (
        <a
          href={ghLink}
          target="_blank"
          rel="noopener noreferrer"
          className="my-8 mt-0 inline-flex min-w-10 max-w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-secondary-foreground p-2 font-medium text-input no-underline shadow-md transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-accent hover:text-primary-foreground hover:shadow-[-1px_-1px_1px_color-mix(in_srgb,var(--foreground)_50%,transparent)]"
        >
          <IoLogoGithub className="w-5 h-5" />
          <span className="wrap-break-word">View on GitHub</span>
        </a>
      )}
    </div>
  );
};

export default ProjectHeader;
