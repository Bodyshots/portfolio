import './test.css';
import '../../components/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectModal from '../../components/ProjectModal';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';


const Test = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    const { setLoading } = useContext(UserContext);

    const modalText = () => {
        return ("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique eos id. Porro, culpa? Officiis, placea");
    }

    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, [setLoading]);

  return (
    <div id="test_pg">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="save-button"
            onClick={() => (modalOpen ? close() : open())}
        >
            Launch modal
        </motion.button>
        <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
        >
            {modalOpen && <ProjectModal modalOpen={modalOpen} handleClose={close} text={modalText()}/>}
        </AnimatePresence>
        <div className="w-full relative flex justify-between flex-wrap gap-3">
        <p className="text-lg m-6 group relative w-max">
        <span>Hover over me</span>
        <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
        </p>
        <p className="text-lg m-6 group relative w-max">
        <span>Hover over me</span>
        <span className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
        </p>
        <p className="text-lg m-6 group relative w-max">
        <span>Hover over me</span>
        <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
        <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
        </p>
        <p className="text-lg m-6 group relative w-max">
        <span className="px-1 relative z-10 group-hover:text-white">Hover over me</span>
        <span className="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-indigo-600 z-0 group-hover:h-full "></span>
        </p>
        </div>
    </div>
  );
}

export default Test;

