import { useNavigate } from "react-router-dom";
// @ts-expect-error react-slick does not provide declarations in this project
import Slider from "react-slick";
import { getProjectCarouselSettings } from "@/constants/carousel";
import ProjectCard from "../ProjectCard";

import "./projectcarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/features/global/LoadingSpinner";
import { createProjectsOptions } from "@/tanstack/queryFns/projects";
import type { Project } from "@/types";

// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

const ProjectCarousel = () => {
  const navigate = useNavigate();

  const {
    data: projects,
    isPending,
    error,
  } = useQuery(createProjectsOptions());

  const open = (name: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(`/project/${encodeURIComponent(name.toLocaleLowerCase())}`);
  };

  const major_projects = projects
    ? projects
        .filter((item): item is Project => item.major)
        .sort((a, b) => a.priority - b.priority)
    : [];

  const settings = getProjectCarouselSettings(major_projects.length);

  if (error) {
    return (
      <div className="text-center text-foreground justify-content align-items text-5xl my-58 mx-auto w-full">
        Hmmm... There are no projects here!
      </div>
    );
  }

  return (
    <div className="mx-auto my-6 w-4/5">
      {!isPending ? (
        <Slider {...settings}>
          {major_projects.map((item) => (
            <ProjectCard key={item.id} item={item} open={open} />
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center my-50.5">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
