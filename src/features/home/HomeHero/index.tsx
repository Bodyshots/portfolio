import { motion, type Variants } from "framer-motion";
import { lazy } from "react";
import NameChanger from "../NameChanger";

const HomeCube = lazy(() => import("../HomeCube"));

const homeCubeAnimation: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.27, 0.01, 0.07, 1],
    },
  },
};

const nameChangerAnimation: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.27, 0.01, 0.07, 1], // [x1, y1, x2, y2]
    },
  },
};

const HomeHero = () => {
  return (
    <div className="h-[32.5em] w-full max-w-full bg-primary text-center text-3xl shadow-[inset_0.8em_0.8em_10em_color-mix(in_srgb,var(--color-muted)_50%,transparent)] max-lg:h-[38.5em] max-lg:overflow max-lg:shadow-[inset_0.8em_0.8em_10em_var(--color-muted)]">
      <div className="relative top-0 m-auto flex h-full max-h-full w-full max-w-full flex-col justify-center text-center text-8xl text-white max-lg:overflow-hidden">
        <div className="mb-4 flex h-full flex-row flex-nowrap justify-center  max-lg:h-120 max-lg:w-full max-lg:flex-col-reverse">
          <motion.div
            variants={homeCubeAnimation}
            initial="hidden"
            animate="visible"
            className="relative ml-10 flex items-center justify-center max-lg:ml-0 max-lg:w-full"
          >
            <HomeCube />
          </motion.div>
          <motion.div
            className="ml-2 mr-10 flex w-3/10 items-center justify-center max-lg:m-0 max-lg:mt-4 max-lg:w-full"
            variants={nameChangerAnimation}
            initial="hidden"
            animate="visible"
          >
            <NameChanger />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
