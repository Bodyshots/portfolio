import { queryOptions } from "@tanstack/react-query";
import { type GetQueryTableProps, getQueryTable } from "./queries";

interface CreateOptionsProps {
  query: GetQueryTableProps;
  param?: string;
}

export const createOptions = <T>({ query, param }: CreateOptionsProps) => {
  const table = getQueryTable(query);
  return queryOptions<T>({
    queryKey: param ? [query.queryKey, param] : [query.queryKey],
    queryFn: () => table.queryFn(param) as Promise<T>,
  });
};
