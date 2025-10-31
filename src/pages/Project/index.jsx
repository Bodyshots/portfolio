import './project.css';
import '../../components/globals.css'
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { Code } from "lucide-react"
import { IoLogoGithub } from "react-icons/io";
import ProjectVideo from '../../components/shared/ProjectVideo';
import { Spinner } from 'react-bootstrap';
import { normTitleHTMLEscape } from '../../lib/utils';

function Project() {
  const { setLoading, loading } = useContext(UserContext);
  const { projName } = useParams();

  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [projVid, setProjVid] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [projTitle, setProjTitle] = useState('')
  const [projImages, setProjImages] = useState([]);
  const [imageAtts, setImageAtts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [tools, setTools] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageAtt, setSelectedImageAtt] = useState('');
  const [imagePosition, setImagePosition] = useState(null);
  const clickedImageRef = useRef(null)

  const openImageModal = (image, event) => {
    const imageElement = event.currentTarget.querySelector("img")
    if (!imageElement) return

    const rect = imageElement.getBoundingClientRect()

    console.log("imageRef;", clickedImageRef)
    clickedImageRef.current = imageElement

    setImagePosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })

    setSelectedImage(image)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalOpen(true)
      })
    })
  }

  const closeImageModal = () => {
    if (clickedImageRef.current) {
      const rect = clickedImageRef.current.getBoundingClientRect()
      setImagePosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      })
    }

    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedImage(null)
      setImagePosition(null)
      clickedImageRef.current = null
    }, 500)
  }

  const setProjDetails = (proj) => {
    if (proj) {
      setProjTitle(proj.name);
      setShortDesc(proj.short_desc);
      setLongDesc(proj.long_desc);
      setProjVid(proj.video);
      setGithubLink(proj.github);
      setProjImages(proj.images);
      setImageAtts(proj.image_atts);
      setTools(proj.tools);
    }
    else {
      setProjTitle('');
      setLongDesc('');
      setProjVid('');
      setGithubLink('');
      setProjImages([]);
      setImageAtts([]);
      setTools([]);
    }
  }


  useEffect(() => {
    setLoading(true);
    setPageLoading(true);
    AOS.init({ duration: 1000 });

    const fetchproj = async () => {
      if (projName) {

        supabase
          .from('Projects')
          .select().then(({ data, error }) => {
            if (error) {
              setProjDetails('')
              console.error(error)
            }

            if (data) {
              const project = data.find((p) =>
                normTitleHTMLEscape(p.name) === projName);
              setProjDetails(project);
            }
            setLoading(false);
            setPageLoading(false);
          });
      }
    }

    fetchproj(); // Get projs from database
  }, [projName]);

  if (pageLoading || loading) {
    return (
      <div className='page_container'>
        <Spinner id="page_spinner" />
      </div>
    );
  }

  return (projTitle ?
    <AnimatePage>
      <Container className='projectContainer flex flex-col max-w-full min-h-dvh w-full h-full justify-center align-middle text-center m-auto pt-16'>
        {/* Header */}
        <div className="border-b-2 bg-accent-light-beige rounded-lg">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 pb-0">
            <h1 className="font-bold my-8 text-secondary-foreground">{projTitle}</h1>
            <p className="text-lg lg:text-xl my-8 text-muted-foreground">{shortDesc}</p>

            <div className="flex flex-wrap gap-4 justify-center my-8">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projectGitLink inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 bg-secondary-foreground p-4 shadow-md hover:white hover:bg-primary-medium hover:transition-all hover:duration-100"
                >
                  <IoLogoGithub className="w-5 h-5" />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 pt-0">

          {/* Video Section - Only show if video exists */}
          {projVid &&
            <div className='mb-16'>
              {ProjectVideo(projVid)}
            </div>}

          {/* Description */}
          {longDesc ?
            <div className="mb-12">
              <h2 className="font-bold mb-6 text-secondary-foreground py-0">About This Project</h2>
              <div className="pt-4 text-left">
                <p className="text-lg leading-relaxed text-muted-foreground m-0">{longDesc}</p>
              </div>
            </div>
            : <div className="mb-12">
              <h2 className="font-bold mb-6 text-secondary-foreground py-4 pt-0">About This Project</h2>
              <span className='text-lg text-muted-foreground'>No long description available.</span>
            </div>
          }

          {/* Tools & Technologies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">Tools & Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="text-secondary-foreground inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-accent-very-light-beige border-2 border-accent shadow-sm"
                >
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          {projImages &&
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-secondary-foreground">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {projImages.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-transform hover:scale-105 border-accent"
                    onClick={(e) => {
                      openImageModal(image, e)
                      setSelectedImageAtt(imageAtts[index])
                    }
                    }
                  >
                    <img src={image} alt={imageAtts[index]} className="w-full h-64 object-cover" />
                    <div className="p-4 bg-border">
                      <p className="text-sm text-muted-foreground m-0">{imageAtts[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }

          {/* Image Modal */}
          {selectedImage && imagePosition && (
            <>
              <div
                className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${isModalOpen ? "opacity-70" : "opacity-0"
                  }`}
                onClick={closeImageModal}
              />

              <div
                className="fixed z-50 transition-all duration-500 ease-out"
                style={{
                  top: isModalOpen ? "50%" : `${imagePosition.top}px`,
                  left: isModalOpen ? "50%" : `${imagePosition.left}px`,
                  transform: isModalOpen ? "translate(-50%, -50%)" : "translate(0, 0)",
                  width: isModalOpen ? "80vw" : `${imagePosition.width}px`,
                  height: isModalOpen ? "auto" : `${imagePosition.height}px`,
                }}
                onClick={closeImageModal}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl h-full" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={selectedImage}
                    alt={projTitle}
                    className={`w-full object-cover transition-all duration-500 ${isModalOpen ? "h-auto max-h-[70vh] object-contain" : "h-full"
                      }`}
                  />
                  <div
                    className={`p-6 bg-border transition-opacity duration-500 ${isModalOpen ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <p className="text-base text-muted-foreground m-0">{selectedImageAtt}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </AnimatePage>
    : (
      <AnimatePage>
        <Container id='not_found_container'>
          <h1 id='not_found_title'>Page not found!</h1>
          <h4 id='not_found_subtitle'>Hmmm... Are you sure you're supposed to be here?</h4>
        </Container>
      </AnimatePage>
    )
  );
}

export default Project