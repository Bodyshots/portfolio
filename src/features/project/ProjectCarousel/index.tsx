import { useNavigate } from "react-router-dom";
// @ts-expect-error react-slick does not provide declarations in this project
import Slider from "react-slick";
import { normTitleHTMLEscape } from "@/lib/utils";
import ProjectCard from "../ProjectCard";

import "./projectcarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  disableProjectsLoading,
  enableProjectsLoading,
  setSelectedProject,
  useProjectStore,
} from "@/store/useProjectStore";
import type { Project } from "@/types";

// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

const ProjectCarousel = () => {
  const navigate = useNavigate();
  const projects = useProjectStore((state) => state.projects);

  const open = (pid: number, name: string) => {
    enableProjectsLoading();
    setSelectedProject(pid);
    disableProjectsLoading();

    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(`/project/${normTitleHTMLEscape(name)}`);
  };

  const major_projects = projects
    ? projects
        .filter((item): item is Project => item.major)
        .sort((a, b) => a.priority - b.priority)
    : [];

  const settings = {
    infinite: true,
    centerPadding: "5px",
    slidesToShow: Math.min(2, major_projects.length),
    speed: 500,
    responsive: [
      {
        breakpoint: 1384,
        settings: {
          slidesToShow: Math.min(1, major_projects.length),
        },
      },
    ],
  };

  return (
    <>
      {major_projects && major_projects.length > 0 ? (
        <div className="mx-auto my-6 w-4/5">
          <Slider {...settings}>
            {major_projects.map((item) => (
              <ProjectCard key={item.id} item={item} open={open} />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="text-center text-foreground justify-content align-items text-4xl my-30 mx-auto w-full h-full">
          Hmmm... There are no projects here!
        </div>
      )}
    </>
  );
};

export default ProjectCarousel;
