import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { normTitleHTMLEscape } from "../../lib/utils";
import ProjectCard from "../ProjectCard";

import "./projectcarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

function ProjectCarousel(project_lst) {
  const navigate = useNavigate();

  const open = (name) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(
      `/project/${normTitleHTMLEscape(project_lst.find((p) => p.name === name).name)}`,
    );
  };

  const major_projects = project_lst
    .map((item) => {
      return item.major ? item : null;
    })
    .filter((item) => item)
    .sort((a, b) => a.priority - b.priority);

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
        <div className="projectcarousel">
          <Slider {...settings}>
            {major_projects.map((item) => (
              <div key={crypto.randomUUID()}>
                {item && ProjectCard(item, open)}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div id="none_projectcarousel">Hmmm... There are no projects here!</div>
      )}
    </>
  );
}

export default ProjectCarousel;
