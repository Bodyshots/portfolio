import '../globals.css'
import './projectcard.css'
import { MdOutlineImageNotSupported } from "react-icons/md";

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function ProjectCard(item, modalOpen, open, close) {
  const SHORT_DESC = item.short_desc
  const SHORT_DESC_LIMIT = 65;

  const NAME = item.name
  const COVER_URL = item.cover_img;
  const TOOLS = item.tools;

  const card_tools = () => {
    return (
      <div className="projectCardTools">
        {TOOLS.slice(0, 4).map((tool) =>
          <div
            className="projectCardTool"
            key={tool}>
            {tool}
          </div>
        )}
      </div>);
  }

  return (
    <div className="projectcard gradient"
      key={item.id}
      onClick={() => (modalOpen ? close() : open(item.id))}
      data-aos="fade-right">
      <div className="projectcard-top img_wrap">
        {COVER_URL ?
          <img
            src={COVER_URL}
            alt={NAME}
            id='projectcard_img'
          /> :
          <MdOutlineImageNotSupported id="missing_img_cover" />}
        <div className='card_info'>
          <p className='card_title'>{NAME}</p>
        </div>
        <p className='card_short_desc'>{SHORT_DESC.length > SHORT_DESC_LIMIT
          ? SHORT_DESC.substring(0, SHORT_DESC_LIMIT) + '...'
          : SHORT_DESC.length === 0
            ? 'No short description'
            : SHORT_DESC}</p>
      </div>
      <span className="projectCardToolsContainer">{card_tools()}</span>
    </div>
  );
}

export default ProjectCard;