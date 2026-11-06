import { motion } from "framer-motion";
import { WorkHistoryConstants } from "@/constants/workhistory";
import WorkContent from "./WorkContent";
import WorkHeader from "./WorkHeader";

export function WorkHistoryModal({ selectedJob, modalOpen, open, close }) {
  const backdropAnim = WorkHistoryConstants.ANIMATION.BACKDROP;
  const dropInAnim = WorkHistoryConstants.ANIMATION.DROP_IN;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      variants={backdropAnim}
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
          className="max-h-[80vh] w-full max-w-260 overflow-y-auto rounded-lg bg-border shadow-[0_8px_32px_0_color-mix(in_srgb,var(--color-foreground)_16%,transparent)]"
          variants={dropInAnim}
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
