import { motion, type Variants } from "framer-motion";
import { AnimationConstants } from "@/constants/animation";
import type { WorkItem } from "@/types";
import WorkContent from "./WorkContent";
import WorkHeader from "./WorkHeader";

const EASING = AnimationConstants.EASING;

const backdropAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const dropInAnimation: Variants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: EASING,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

interface WorkHistoryModalProps {
  selectedJob: WorkItem;
  modalOpen: boolean;
  open: (id: number) => void;
  close: () => void;
}

export function WorkHistoryModal({
  selectedJob,
  modalOpen,
  open,
  close,
}: WorkHistoryModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      variants={backdropAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={close}
    >
      <div
        key={selectedJob.id}
        onClick={() => (modalOpen ? close() : open(selectedJob.id))}
        role="dialog"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <motion.div
          className="max-h-[80vh] w-full max-w-260 overflow-y-auto rounded-lg bg-border shadow-[0_8px_32px_0_color-mix(in_srgb,var(--foreground)_16%,transparent)]"
          variants={dropInAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <WorkHeader selectedJob={selectedJob} close={close} />
          <WorkContent selectedJob={selectedJob} />
        </motion.div>
      </div>
    </motion.div>
  );
}
