import { QueryTableType, type WorkQueryKey } from "@/models";
import { selectFromQueryTable } from "../queries";
import { dataOrThrow } from "./error";

interface WorkSelectFromEqProps {
  queryKey: WorkQueryKey;
  workId: number;
}

interface WorkGetterProps {
  queryKey: WorkQueryKey;
  workId?: string;
}

const workSelectAllFromId = ({ queryKey, workId }: WorkSelectFromEqProps) => {
  return selectFromQueryTable({
    queryTable: QueryTableType.WORK,
    queryKey,
  }).eq("work_id", workId);
};

export const workGetter = async <T>({
  queryKey,
  workId,
}: WorkGetterProps): Promise<T> => {
  const result = workId
    ? await workSelectAllFromId({ queryKey, workId: Number(workId) })
    : await selectFromQueryTable({
        queryTable: QueryTableType.WORK,
        queryKey,
      });

  return dataOrThrow({
    data: result.data ?? [],
    error: result.error,
    errorMsg: workId
      ? `Error fetching ${queryKey}s for work item ${workId}`
      : "Error fetching work",
  }) as T;
};
