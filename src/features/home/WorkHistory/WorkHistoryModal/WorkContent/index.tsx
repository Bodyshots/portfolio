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
          className="flex min-w-0 items-start gap-2 wrap-break-word text-sm text-card-foreground dark:text-card"
        >
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-card-foreground/50 dark:bg-foreground/50" />
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
    <div className="mb-4 min-w-0 text-left">
      <h3 className="mb-3 flex min-w-0 flex-wrap items-center gap-2 wrap-break-word text-lg text-foreground">
        <TitleIcon className="h-5 w-5 shrink-0" />
        {title}
      </h3>
      {children}
    </div>
  );
};

const WorkContent = ({ selectedJob }: { selectedJob: WorkItem }) => {
  return (
    <div className="flex min-w-0 flex-col p-6 max-xs:p-3">
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
        <div className="flex min-w-0 flex-wrap gap-2">
          {selectedJob.technologies?.map((tech) => (
            <Tool
              key={tech}
              tool={tech}
              className="min-w-0 max-w-full wrap-break-word"
            />
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
