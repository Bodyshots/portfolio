import { BriefcaseIcon, type LucideIcon, WrenchIcon } from "lucide-react";
import type { ReactNode } from "react";
import Tool from "@/features/global/Tool";
import type { WorkItem } from "@/types";

interface BulletPointSectionProps {
  points: string[] | null;
  missingText: string;
}

interface CardSectionProps {
  title: string;
  titleIcon: LucideIcon;
  children: ReactNode;
}

const BulletPointSection = ({
  points,
  missingText,
}: BulletPointSectionProps) => {
  if (!points)
    return <span className="text-card-foreground">{missingText}</span>;

  return (
    <ul>
      {points.map((point) => (
        <li
          key={point}
          className="flex items-start gap-2 text-sm text-card-foreground"
        >
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted" />
          {point}
        </li>
      ))}
    </ul>
  );
};

const CardSection = ({
  title,
  titleIcon: TitleIcon,
  children,
}: CardSectionProps) => {
  return (
    <div className="text-left mb-4">
      <h3 className="mb-3 flex items-center gap-2 text-lg text-foreground dark:text-shadow-md dark:text-shadow-black ">
        <TitleIcon className="h-5 w-5" />
        {title}
      </h3>
      {children}
    </div>
  );
};

const WorkContent = ({ selectedJob }: { selectedJob: WorkItem }) => {
  return (
    <div className="flex flex-col p-6">
      <CardSection title={"Key Responsibilities"} titleIcon={BriefcaseIcon}>
        <BulletPointSection
          points={selectedJob.responsibilities}
          missingText="No responsibilities available. Check back later!"
        />
      </CardSection>
      <CardSection title={"Key Achievements"} titleIcon={BriefcaseIcon}>
        <BulletPointSection
          points={selectedJob.achievements}
          missingText="No achievements available. Check back later!"
        />
      </CardSection>
      <CardSection title={"Technologies & Tools"} titleIcon={WrenchIcon}>
        <div className="flex flex-wrap gap-2">
          {selectedJob.technologies?.map((tech) => (
            <Tool key={tech} tool={tech} />
          )) ?? (
            <span className="text-left">
              No technologies available. Check back later!
            </span>
          )}
        </div>
      </CardSection>
    </div>
  );
};

export default WorkContent;
