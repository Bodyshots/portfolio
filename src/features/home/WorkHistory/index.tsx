import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { WorkHistoryConstants } from "@/constants/workhistory";
import { createIds } from "@/lib/utils";
import createExperienceOptions from "@/tanstack/queryFns/experiences";
import { WorkBubble } from "./WorkBubble";
import { WorkHistoryModal } from "./WorkHistoryModal";

const maxProjects = WorkHistoryConstants.LIMITS.MAX;
const _LOADING_WORK_IDS = createIds(maxProjects, "workbubble-");

export default function WorkHistory() {
  const [isActive, setIsActive] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: experience,
    isPending,
    error,
  } = useQuery(createExperienceOptions());

  const open = (id: number) => {
    setIsActive(id);
    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  const experiences = useMemo(
    () =>
      Array.isArray(experience)
        ? [...experience].sort((a, b) => a.id - b.id)
        : [],
    [experience],
  );

  if (error) {
    return (
      <div className="my-12 h-full w-full text-center text-4xl text-foreground">
        Hmmm... There's nothing here!
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-16 text-center text-5xl text-foreground">
          From latest to oldest (2023)
        </h1>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-muted" />
          {experiences.map((job, index) => (
            <WorkBubble
              key={job.id}
              job={job}
              isPending={isPending}
              leftAlign={index % 2 === 1}
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
    </div>
  );
}
