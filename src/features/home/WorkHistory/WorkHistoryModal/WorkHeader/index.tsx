import {
  CalendarIcon,
  type LucideIcon,
  MapPinIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import type { WorkItem } from "@/types";

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
    <div className="flex items-center gap-1">
      <Icon className="w-4 h-4" />
      {text}
    </div>
  );
};

const WorkHeader = ({ selectedJob, close }: WorkHeaderProps) => {
  return (
    <div className="border-b-2 border-foreground! p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h1 className="mb-2 text-left text-3xl text-foreground">
            {selectedJob.title}
          </h1>
          <h2 className="mb-1 text-left text-xl text-accent">
            {selectedJob.company}
          </h2>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-accent">
            <HeaderBullet icon={CalendarIcon} text={selectedJob.years ?? ""} />
            <HeaderBullet icon={MapPinIcon} text={selectedJob.location ?? ""} />
            {selectedJob.team_size && (
              <HeaderBullet icon={UsersIcon} text={selectedJob.team_size} />
            )}
          </div>
        </div>
        <button
          onClick={close}
          className="rounded-full p-2 transition-colors duration-200 hover:bg-secondary"
          aria-label="Close"
          type="button"
        >
          <XIcon className="h-6 w-6 text-accent" />
        </button>
      </div>
    </div>
  );
};

export default WorkHeader;
