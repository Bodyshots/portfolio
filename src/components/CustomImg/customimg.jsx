import Zoom from 'react-medium-image-zoom'
import '../globals.css'
import './customimg.css'

export const CustomImg = ({ caption, src, alt }) => (
  <div>
    <Zoom>
      <img
        alt={alt}
        src={src}
        className="project_imgs inset-0 w-full h-full object-cover"
      />
    </Zoom>
    {src && <span className="modal_image_att text-sm">{caption}</span>}
  </div>
)
