import type { WorkItem } from "@/types";

interface WorkBubbleProps {
  job: WorkItem;
  leftAlign: boolean;
  open: (id: number) => void;
}

export const WorkBubble = ({ job, leftAlign, open }: WorkBubbleProps) => {
  return (
    <div
      key={job.id}
      className={`relative mb-16 flex w-full items-center ${
        leftAlign ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex w-1/2 px-8 ${
          leftAlign ? "justify-end text-right" : "justify-start text-left"
        }`}
      >
        <button
          className={`inline-block cursor-pointer rounded-lg border-2 p-6 shadow-[0_4px_24px_0_color-mix(in_srgb,var(--color-foreground)_8%,transparent)] transition-transform duration-200 hover:scale-105 ${
            leftAlign
              ? "border-primary bg-secondary text-right"
              : "border-secondary bg-card text-left"
          }`}
          onClick={() => open(job.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              open(job.id);
            }
          }}
          type="button"
          tabIndex={0}
        >
          <h2 className="mb-1 text-xl text-foreground">{job.title}</h2>
          <h3 className="mb-1 text-lg text-accent">{job.company}</h3>
          <p className="mb-3 text-base text-accent">{job.years}</p>
          <p className="text-sm leading-6 text-foreground">{job.description}</p>
        </button>
      </div>
      <div className="absolute left-1/2 z-10 -translate-x-1/2">
        <div className="h-4 w-4 rounded-full border-2 border-muted bg-card" />
      </div>
    </div>
  );
};

export default WorkBubble;
