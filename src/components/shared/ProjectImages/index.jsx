import './projectimages.css'
import { MdOutlineImageNotSupported } from "react-icons/md";
import { CustomImg } from '../../CustomImg/customimg';
import { Carousel } from "react-bootstrap";

function ProjectImages(projectName, projectImages, projectAtts) {
  return (
    (projectImages && projectImages.length > 0) ? (
      projectImages.length > 1 ? ( // More than 1 image
        <Carousel data-bs-theme="dark" indicators={false} style={{ width: "100%", marginBottom: "1em" }}>
          {projectImages.map((image, i) => (
            <Carousel.Item key={i}>
              <CustomImg caption={projectAtts[i]} alt={projectName} src={image} />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <CustomImg caption={projectAtts[0]} alt={projectName} src={projectImages[0]} />
      )
    ) : (
      <MdOutlineImageNotSupported id="missing_img_modal" size={64} />
    )
  )
}

export default ProjectImages