import { useQuery } from "@tanstack/react-query";
import { BriefcaseIcon, type LucideIcon, WrenchIcon } from "lucide-react";
import type { ReactNode } from "react";
import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import LoadingTools from "@/features/global/Skeletons/LoadingTools";
import Tool from "@/features/global/Tool";
import { QueryTableType, type WorkItemList } from "@/models";
import { createOptions } from "@/tanstack/queryFns";

interface BulletPointSectionProps {
  isPending: boolean;
  isError: Error | null;
  points: string[] | null;
  pointIds: number[];
  missingText: string;
  errorText: string;
}

interface CardSectionProps {
  title: string;
  titleIcon: LucideIcon;
  children: ReactNode;
}

const BulletPointSection = ({
  isPending,
  isError,
  points,
  pointIds,
  missingText,
  errorText,
}: BulletPointSectionProps) => {
  if (isPending) {
    return <LoadingSkeleton count={3} />;
  }
  if (!points || points.length <= 1)
    return <span className="text-card-foreground">{missingText}</span>;
  if (isError) return <span className="text-card-foreground">{errorText}</span>;

  return (
    <ul>
      {points.map((point, i) => (
        <li
          key={pointIds[i]}
          className="flex min-w-0 items-start gap-2 wrap-break-word text-sm text-card-foreground py-1  dark:text-card"
        >
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-card-foreground/50 dark:bg-foreground/50" />
          {point}
        </li>
      ))}
    </ul>
  );
};

const ToolSection = ({
  isPending,
  isError,
  points,
  pointIds,
  missingText,
  errorText,
}: BulletPointSectionProps) => {
  if (isPending) {
    return (
      <div className="flex min-w-0 flex-wrap gap-2 text-card-foreground">
        <LoadingTools width="6em" />
      </div>
    );
  }

  if (!points || points.length <= 1)
    return (
      <div className="flex min-w-0 flex-wrap gap-2 text-card-foreground">
        <span className="text-left">{missingText}</span>
      </div>
    );

  if (isError) {
    return (
      <div className="flex min-w-0 flex-wrap gap-2 text-card-foreground">
        <span className="text-left">{errorText}</span>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      {points?.map((point, i) => (
        <Tool
          key={pointIds[i]}
          tool={point}
          className="min-w-0 max-w-full wrap-break-word"
        />
      )) ?? <span className="text-left">{missingText}</span>}
    </div>
  );
};

const CardSection = ({
  title,
  titleIcon: TitleIcon,
  children,
}: CardSectionProps) => {
  return (
    <div className="mb-4 min-w-0 text-left">
      <h3 className="mb-1 flex min-w-0 flex-wrap items-center gap-2 wrap-break-word text-lg text-foreground">
        <TitleIcon className="h-5 w-5 shrink-0" />
        {title}
      </h3>
      {children}
    </div>
  );
};

const WorkContent = ({ selectedJobId }: { selectedJobId: number }) => {
  const {
    data: resps,
    isPending: respPending,
    error: respError,
  } = useQuery(
    createOptions<WorkItemList[]>({
      query: {
        queryTable: QueryTableType.WORK,
        queryKey: "workResponsibilities",
      },
      param: selectedJobId.toString(),
    }),
  );

  const {
    data: achieves,
    isPending: achievesPending,
    error: achievesError,
  } = useQuery(
    createOptions<WorkItemList[]>({
      query: {
        queryTable: QueryTableType.WORK,
        queryKey: "workAchievements",
      },
      param: selectedJobId.toString(),
    }),
  );

  const {
    data: techs,
    isPending: techsPending,
    error: techsError,
  } = useQuery(
    createOptions<WorkItemList[]>({
      query: {
        queryTable: QueryTableType.WORK,
        queryKey: "workTechnologies",
      },
      param: selectedJobId.toString(),
    }),
  );

  return (
    <div className="flex min-w-0 flex-col p-6 max-xs:p-3">
      <CardSection title={"Key Responsibilities"} titleIcon={BriefcaseIcon}>
        <BulletPointSection
          isError={respError}
          isPending={respPending}
          points={resps?.map((resp) => resp.content) ?? []}
          pointIds={resps?.map((resp) => resp.id) ?? []}
          missingText="No responsibilities available. Check back later!"
          errorText="There was an error getting this job's responsibilities. Check back later!"
        />
      </CardSection>
      <CardSection title={"Key Achievements"} titleIcon={BriefcaseIcon}>
        <BulletPointSection
          isError={achievesError}
          isPending={achievesPending}
          points={achieves?.map((achieve) => achieve.content) ?? []}
          pointIds={achieves?.map((achieve) => achieve.id) ?? []}
          missingText="No achievements available. Check back later!"
          errorText="There was an error getting this job's achievements. Check back later!"
        />
      </CardSection>
      <CardSection title={"Technologies & Tools"} titleIcon={WrenchIcon}>
        <ToolSection
          isError={techsError}
          isPending={techsPending}
          points={techs?.map((tech) => tech.content) ?? []}
          pointIds={techs?.map((tech) => tech.id) ?? []}
          missingText="No technologies available. Check back later!"
          errorText="There was an error getting this job's technologies. Check back later!"
        />
      </CardSection>
    </div>
  );
};

export default WorkContent;
