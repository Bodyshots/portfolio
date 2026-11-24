import supabase from "@/config/supabaseClient";
import type { WorkQueryKey } from "@/types";
import { QUERY_TABLES } from "../queries";
import { dataOrThrow } from "./error";

interface WorkSelectFromEqProps {
  queryKey: WorkQueryKey;
  workId: number;
}

interface WorkGetterProps {
  queryKey: WorkQueryKey;
  workId?: string;
}

const workSelectAllFrom = (queryKey: WorkQueryKey) => {
  return supabase.from(QUERY_TABLES.WORK[queryKey].database).select("*");
};

export const workSelectAllFromEq = ({
  queryKey,
  workId,
}: WorkSelectFromEqProps) => {
  return workSelectAllFrom(queryKey).eq("id", workId).order("priority");
};

export const workGetter = async <T>({
  queryKey,
  workId,
}: WorkGetterProps): Promise<T> => {
  const result = workId
    ? await workSelectAllFromEq({ queryKey, workId: Number(workId) })
    : await workSelectAllFrom(queryKey);

  return dataOrThrow({
    data: result.data ?? [],
    error: result.error,
    errorMsg: workId
      ? `Error fetching ${queryKey}s for work item ${workId}`
      : "Error fetching work",
  }) as T;
};
