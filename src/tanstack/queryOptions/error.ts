import type { PostgrestError } from "@supabase/supabase-js";

interface DataOrThrowProps<T> {
  data: T[];
  error: PostgrestError | null;
  errorMsg: string;
}

export const dataOrThrow = <T>({
  data,
  error,
  errorMsg,
}: DataOrThrowProps<T>): T[] => {
  if (error) throw new Error(`${errorMsg}: ${error.message}`);
  return data;
};
