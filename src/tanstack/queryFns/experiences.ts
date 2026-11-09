import { queryOptions } from "@tanstack/react-query";
import { getExperiences } from "../queryOptions/experiences";

export default function createExperienceOptions() {
  return queryOptions({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });
}
