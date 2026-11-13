import { motion, type Variants } from "framer-motion";
import { AnimationConstants } from "@/constants/animation";
import type { WorkItem } from "@/types";
import HistoryCircle from "../HistoryCircle";
import LoadingWorkSkeleton from "../LoadingWorkSkeleton";

const EASING = AnimationConstants.EASING;

interface WorkBubbleProps {
  job: WorkItem;
  leftAlign: boolean;
  isPending: boolean;
  open: (id: number) => void;
}

const getBubbleAnimation = (leftAlign: boolean): Variants => {
  return {
    hidden: {
      x: leftAlign ? -20 : 20,
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: EASING,
      },
    },
  };
};

export const WorkBubble = ({
  job,
  leftAlign,
  isPending,
  open,
}: WorkBubbleProps) => {
  const bubbleAnim = getBubbleAnimation(leftAlign);

  return (
    <div
      className={`relative mb-16 flex w-full items-center ${
        leftAlign ? "justify-start" : "justify-end"
      }`}
    >
      <motion.div
        className={`flex w-1/2 px-8 ${
          leftAlign ? "justify-end text-right" : "justify-start text-left"
        }`}
        variants={bubbleAnim}
        initial="hidden"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        {isPending ? (
          <LoadingWorkSkeleton leftAlign={leftAlign} />
        ) : (
          <button
            className={`inline-block cursor-pointer rounded-lg border-2 p-6 shadow-[0_4px_24px_0_color-mix(in_srgb,var(--foreground)_8%,transparent)] transition-transform duration-200 hover:scale-105 ${
              leftAlign
                ? "border-primary bg-secondary text-right"
                : "border-secondary bg-card text-left"
            }`}
            onClick={() => open(job.id)}
            type="button"
          >
            <h2 className="mb-1 text-xl text-foreground">{job.title}</h2>
            <h3 className="mb-1 text-lg text-accent">{job.company}</h3>
            <p className="mb-3 text-base text-accent">{job.years}</p>
            <p className="text-sm leading-6 text-foreground">
              {job.description}
            </p>
          </button>
        )}
      </motion.div>
      <HistoryCircle />
    </div>
  );
};

export default WorkBubble;
