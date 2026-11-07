import HomeCube from "../HomeCube";
import NameChanger from "../NameChanger";

const HomeHero = () => {
  return (
    <div className="h-[32.5em] w-full max-w-full bg-primary text-center text-3xl shadow-[inset_0.8em_0.8em_10em_color-mix(in_srgb,var(--color-muted)_50%,transparent)] max-lg:h-[38.5em] max-lg:overflow-hidden max-lg:shadow-[inset_0.8em_0.8em_10em_var(--color-muted)]">
      <div className="relative top-0 m-auto flex h-full max-h-full w-full max-w-full flex-col justify-center text-center text-8xl text-white max-lg:overflow-hidden">
        <div className="mb-4 flex h-full flex-row flex-nowrap justify-center overflow-x-hidden max-lg:h-120 max-lg:w-full max-lg:flex-col-reverse max-lg:overflow-visible">
          <span
            className="relative ml-10 flex items-center justify-center max-lg:ml-0 max-lg:w-full"
            data-aos="fade-down"
          >
            <HomeCube data-aos="fade-right" />
          </span>
          <span
            className="ml-2 mr-10 flex w-3/10 items-center justify-center max-lg:m-0 max-lg:mt-4 max-lg:w-full"
            data-aos="fade-left"
          >
            <NameChanger />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
