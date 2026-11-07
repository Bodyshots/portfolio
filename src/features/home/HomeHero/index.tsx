import HomeCube from "../HomeCube";
import NameChanger from "../NameChanger";

const HomeHero = () => {
  return (
    <div className="h-[32.5em] w-full max-w-full bg-[#e5ddac] text-center text-[30px] shadow-[inset_0.8em_0.8em_10em_rgba(185,147,124,0.5)] max-[991px]:h-[38.5em] max-[991px]:overflow-hidden max-[991px]:shadow-[inset_0.8em_0.8em_10em_rgba(185,147,124,1)]">
      <div className="relative top-0 m-auto flex h-full max-h-full w-full max-w-full flex-col justify-center text-center text-[100px] text-white max-[991px]:overflow-hidden">
        <div className="mb-[1em] flex h-full flex-row flex-nowrap justify-center overflow-x-hidden max-[991px]:h-[30em] max-[991px]:w-full max-[991px]:flex-col-reverse max-[991px]:overflow-visible">
          <span
            className="relative ml-[2.5em] flex items-center justify-center max-[991px]:ml-0 max-[991px]:w-full"
            data-aos="fade-down"
          >
            <HomeCube data-aos="fade-right" />
          </span>
          <span
            className="ml-[0.5em] mr-[2.5em] flex w-[30%] items-center justify-center max-[991px]:m-0 max-[991px]:mt-[1em] max-[991px]:w-full"
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
