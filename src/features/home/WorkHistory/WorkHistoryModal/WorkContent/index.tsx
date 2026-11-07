import { AwardIcon, BriefcaseIcon, type LucideIcon } from "lucide-react";
import type { WorkItem } from "@/types";
import WorkTech from "./WorkTech";

interface BulletPointSectionProps {
  title: string;
  titleIcon: LucideIcon;
  points: string[] | null;
  missingText: string;
}

interface WorkContentProps {
  selectedJob: WorkItem;
}

const BulletPointSection = ({
  title,
  titleIcon: TitleIcon,
  points,
  missingText,
}: BulletPointSectionProps) => {
  return (
    <div className="text-left mb-4">
      <h3 className="mb-3 flex items-center gap-2 text-lg text-foreground">
        <TitleIcon className="h-5 w-5" />
        {title}
      </h3>
      {points ? (
        <ul>
          {points.map((point) => (
            <li
              key={crypto.randomUUID()}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted" />
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-foreground">{missingText}</span>
      )}
    </div>
  );
};

const WorkContent = ({ selectedJob }: WorkContentProps) => {
  return (
    <div className="flex flex-col p-6">
      <BulletPointSection
        title={"Key Responsibilities"}
        titleIcon={BriefcaseIcon}
        points={selectedJob.responsibilities}
        missingText="No responsibilities available. Check back later!"
      />
      <BulletPointSection
        title={"Key Achievements"}
        titleIcon={AwardIcon}
        points={selectedJob.achievements}
        missingText="No achievements available. Check back later!"
      />
      <WorkTech technologies={selectedJob.technologies} />
    </div>
  );
};

export default WorkContent;
