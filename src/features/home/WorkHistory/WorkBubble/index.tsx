import { motion, type Variants } from "framer-motion";
import { AnimationConstants } from "@/constants/animation";
import type { WorkItem } from "@/models";
import HistoryCircle from "../HistoryCircle";

const EASING = AnimationConstants.EASING;

interface WorkBubbleProps {
  job: WorkItem;
  leftAlign: boolean;
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

export const WorkBubble = ({ job, leftAlign, open }: WorkBubbleProps) => {
  const bubbleAnim = getBubbleAnimation(leftAlign);

  return (
    <div
      className={`relative mb-16 flex w-full items-center motion-reduce:transition-none ${
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
        <button
          className={`inline-block cursor-pointer rounded-lg border-2 p-6 transition-transform duration-200 hover:scale-105 ${
            leftAlign
              ? "border-primary bg-secondary text-right"
              : "border-secondary bg-white text-left"
          }`}
          onClick={() => open(job.id)}
          type="button"
        >
          <h2 className="mb-1 text-xl text-card-primary">{job.title}</h2>
          <h3 className="mb-1 text-lg text-card-secondary">{job.company}</h3>
          <p className="mb-3 text-base text-card-secondary">{job.years}</p>
          <p className="text-sm leading-6 text-card-primary">
            {job.description}
          </p>
        </button>
      </motion.div>
      <HistoryCircle />
    </div>
  );
};

export default WorkBubble;
