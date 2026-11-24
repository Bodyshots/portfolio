import {
  CalendarIcon,
  type LucideIcon,
  MapPinIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import type { WorkItem } from "@/models";

interface HeaderBulletProps {
  icon: LucideIcon;
  text: string;
}

interface WorkHeaderProps {
  selectedJob: WorkItem;
  close: () => void;
}

const HeaderBullet = ({ icon: Icon, text }: HeaderBulletProps) => {
  return (
    <div className="flex min-w-0 items-center gap-1 wrap-break-word">
      <Icon className="h-4 w-4 shrink-0" />
      {text}
    </div>
  );
};

const WorkHeader = ({ selectedJob, close }: WorkHeaderProps) => {
  return (
    <div className="border-b-2 border-foreground! p-6 max-xs:p-3">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 pr-4 max-xs:pr-1 flex-col">
          <h1 className="mb-2 wrap-break-word text-left text-3xl text-foreground max-xs:text-xl">
            {selectedJob.title}
          </h1>
          <h2 className="mb-1 wrap-break-word text-left text-xl text-card-secondary/90 max-xs:text-base">
            {selectedJob.company}
          </h2>
          <div className="mt-2 flex min-w-0 flex-wrap gap-4 text-sm text-card-primary">
            <HeaderBullet icon={CalendarIcon} text={selectedJob.years ?? ""} />
            <HeaderBullet icon={MapPinIcon} text={selectedJob.location ?? ""} />
            {selectedJob.team_size && (
              <HeaderBullet icon={UsersIcon} text={selectedJob.team_size} />
            )}
          </div>
        </div>
        <button
          onClick={close}
          className="shrink-0 rounded-lg p-2 transition-colors duration-100 hover:bg-secondary hover:cursor-pointer h-6"
          aria-label="Close"
          type="button"
        >
          <XIcon className="h-6 w-6 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default WorkHeader;
