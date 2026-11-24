import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import LoadingWorkHistorySkeleton from "@/features/global/Skeletons/LoadingWorkHistorySkeleton";
import { QueryTableType, type WorkItem } from "@/models";
import { createOptions } from "@/tanstack/queryFns";
import { WorkBubble } from "./WorkBubble";
import { WorkHistoryModal } from "./WorkHistoryModal";

export default function WorkHistory() {
  const [isActive, setIsActive] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: experiences,
    isPending,
    error,
  } = useQuery(
    createOptions<WorkItem[]>({
      query: { queryTable: QueryTableType.WORK, queryKey: "work" },
    }),
  );

  const open = (id: number) => {
    setIsActive(id);
    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  if (error) {
    return (
      <div className="my-12 h-full w-full text-center text-4xl text-foreground break-all">
        Hmmm... There are no jobs here!
      </div>
    );
  }

  if (isPending) {
    return <LoadingWorkHistorySkeleton />;
  }

  return (
    <>
      <div className="mx-auto max-w-5xl overflow-hidden p-12 ">
        <h1 className="mb-16 text-center text-5xl text-foreground">
          From latest to oldest (2023)
        </h1>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-muted" />
          {experiences.map((job, i) => (
            <WorkBubble
              key={job.id}
              job={job}
              leftAlign={i % 2 === 1}
              open={open}
            />
          ))}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <WorkHistoryModal
            selectedJob={experiences[isActive - 1]}
            modalOpen={modalOpen}
            open={open}
            close={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}
