import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import supabase from "@/config/supabaseClient";
import type { WorkItem } from "@/types";
import { WorkBubble } from "./WorkBubble";
import { WorkHistoryModal } from "./WorkHistoryModal";

export default function WorkHistory() {
  const [isActive, setIsActive] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [experience, setExperience] = useState<WorkItem[] | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from(import.meta.env.VITE_WORK_DB_NAME)
        .select();

      if (error) {
        setExperience(null);
        console.error("Could not fetch experience");
      }

      if (data) {
        setExperience(data);
      }
    };
    fetchExperience();
  }, []);

  const open = (id: number) => {
    setIsActive(id);
    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  const experience_lst = useMemo(
    () =>
      Array.isArray(experience)
        ? [...experience].sort((a, b) => a.id - b.id)
        : [],
    [experience],
  );

  return experience_lst && experience_lst.length > 0 ? (
    <div className="bg-primary p-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-16 text-center text-5xl text-foreground">
          From present to oldest (2023)
        </h1>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-muted" />
          {experience_lst.map((job, index) => {
            return (
              <WorkBubble
                key={job.id}
                job={job}
                leftAlign={index % 2 === 1}
                open={open}
              />
            );
          })}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <WorkHistoryModal
            selectedJob={experience_lst[isActive - 1]}
            modalOpen={modalOpen}
            open={open}
            close={close}
          />
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div className="my-12 h-full w-full text-center text-4xl text-foreground">
      Hmmm... There's nothing here!
    </div>
  );
}
