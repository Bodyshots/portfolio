import { queryOptions } from "@tanstack/react-query";
import type { WorkQueryKey } from "@/types";
import { QUERY_TABLES } from "../queries";

interface CreateWorkOptionsProps {
  key: WorkQueryKey;
  workId?: string;
}

export const createWorkOptions = <T>({
  key,
  workId,
}: CreateWorkOptionsProps) => {
  const table = QUERY_TABLES.WORK[key];
  return queryOptions<T>({
    queryKey: workId ? [key, workId] : [key],
    queryFn: () => table.queryFn(workId) as Promise<T>,
  });
};
