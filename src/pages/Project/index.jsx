import './project.css';
import '../../components/globals.css'
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { Code } from "lucide-react"
import { IoLogoGithub } from "react-icons/io";
import ProjectVideo from '../../components/shared/ProjectVideo';
import ProjectImages from '../../components/shared/ProjectImages';

function Project() {
  const { setLoading } = useContext(UserContext);
  const { projName } = useParams();

  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [projVid, setProjVid] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [projTitle, setProjTitle] = useState('')
  const [projImages, setProjImages] = useState([]);
  const [imageAtts, setImageAtts] = useState([]);
  const [tools, setTools] = useState([]);

  const setprojDetails = (proj) => {
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
    AOS.init({ duration: 1000 });

    const fetchproj = async () => {
      if (projName) {
        const normName = projName.replace(/-/g, " ").toLowerCase();

        const { data, error } = await supabase
          .from('Projects')
          .select()

        if (error) {
          setprojDetails('')
          console.error(error)
        }

        if (data) {
          setprojDetails(data.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === normName));
        }
      }
    }

    fetchproj(); // Get projs from database
    setLoading(false);
  }, [setLoading]);

  console.log(projVid);

  return (
    <AnimatePage>
      <Container className='projectContainer flex flex-col max-w-full min-h-dvh w-full h-full justify-center align-middle text-center m-auto pt-16'>
        {/* Header */}
        <div className="border-b-2 bg-accent-light-beige rounded-lg">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 pb-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-secondary-foreground">{projTitle}</h1>
            <p className="text-lg lg:text-xl mb-6 text-muted-foreground">{shortDesc}</p>

            <div className="flex flex-wrap gap-4 justify-center">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projectGitLink inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 bg-secondary-foreground p-4 shadow-md hover:white hover:bg-primary-medium hover:transition-all hover:duration-100"
                >
                  <IoLogoGithub className="w-5 h-5" />
                  <span className=''>View on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 pt-0">
          {/* Project Info Cards */}
          <div className="grid grid-cols-1 gap-4 mb-12">
            {/* {project.completedDate && (
                <div className="p-4 rounded-lg border-2 bg-card border-secondary max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-(--color-primary-light)" />
                    <h3 className="font-semibold text-primary">Completed</h3>
                  </div>
                  <p className="text-muted-foreground">{project.completedDate}</p>
                </div>
              )} */}
          </div>

          {/* Video Section - Only show if video exists */}
          {projVid ? ProjectVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")
            : ProjectImages(projTitle, projImages, imageAtts)}

          {/* Tools & Technologies */}
          <div className="mb-12 my-8">
            <h2 className="text-2xl font-bold mb-6 text-primary my-4">Tools & Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-background border-2 border-accent text-primary shadow-sm"
                >
                  <Code className="w-4 h-4 text-(--color-primary-light)" />
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          {longDesc ?
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary py-4 pt-0">About This Project</h2>
              <div className="p-6 rounded-lg border-2 border-accent shadow-lg text-left">
                <p className="text-base leading-relaxed text-primary">{longDesc}</p>
              </div>
            </div>
            : <span>No long description available.</span>
          }
          {/* Image Gallery */}
          {/* <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-transform hover:scale-105 border-accent"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-64 object-cover" />
                    <div className="p-4 bg-secondary">
                      <p className="text-sm text-primary">{image.attribution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Image Modal */}
          {/* {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <div className="max-w-5xl w-full">
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img src={selectedImage.url || "/placeholder.svg"} alt={selectedImage.alt} className="w-full h-auto" />
                  <div className="p-6 bg-secondary">
                    <p className="text-base text-primary">{selectedImage.attribution}</p>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </Container>
    </AnimatePage>
  );
}

export default Project