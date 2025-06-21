import Zoom from 'react-medium-image-zoom'
import { useState, useLayoutEffect } from 'react'
import '../globals.css'

export const CustomImg = ({ caption, src, alt }) => (
  <>
    {/* <Zoom ZoomContent={(props) => <CustomZoomContent {...props} caption={caption} />}> */}
    <Zoom>
      <img
        alt={alt}
        src={src}
        className="project_imgs"
      />
    </Zoom>
    {src && <span className="modal_image_att text-sm">{caption}</span>}
  </>
)

const CustomZoomContent = ({
  buttonUnzoom,
  modalState,
  img,
  caption,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => {
    if (modalState === 'LOADED') {
      setIsLoaded(true)
    } else if (modalState === 'UNLOADING') {
      setIsLoaded(false)
    }
  }, [modalState])

  const classCaption = isLoaded
    ? 'zoom-caption--bottom zoom-caption--loaded zoom-caption'
    : 'zoom-caption--bottom zoom-caption'

  return (
    <figure>
      {buttonUnzoom}
      {img}
      <figcaption className={classCaption}>
        {caption}
      </figcaption>
    </figure>
  )
}

