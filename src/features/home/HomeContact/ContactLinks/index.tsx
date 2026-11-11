import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from "react-icons/io";
import type { IconType } from "react-icons/lib";

interface ContactLinkProps {
  href: string;
  ariaLabel: string;
  icon: IconType;
}

const ContactLink = ({ href, ariaLabel, icon: Icon }: ContactLinkProps) => {
  return (
    <a
      aria-label={ariaLabel}
      href={href}
      className="flex items-center justify-center rounded-sm transition-all duration-150 hover:bg-foreground hover:text-primary-foreground hover:shadow-[3px_3px_3px_color-mix(in_srgb,var(--color-foreground)_30%,transparent)] gap-4"
    >
      <Icon className="h-12 w-12 md:h-15 md:w-15 p-0.5" />
    </a>
  );
};

export const ContactLinks = () => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center text-2xl">
      <span className="mb-2">Links</span>
      <div className="flex max-w-full flex-wrap justify-center gap-4">
        <ContactLink
          ariaLabel="GitHub"
          href={import.meta.env.VITE_GITHUB_URL}
          icon={IoLogoGithub}
        />
        <ContactLink
          ariaLabel="LinkedIn"
          href={import.meta.env.VITE_LINKEDIN_URL}
          icon={IoLogoLinkedin}
        />
        <ContactLink
          ariaLabel="Email"
          href={import.meta.env.VITE_EMAIL}
          icon={IoMdMail}
        />
      </div>
    </div>
  );
};
