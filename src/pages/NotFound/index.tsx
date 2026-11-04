import AnimatePage from "../../components/AnimatePage";

function NotFound() {
  return (
    <AnimatePage>
      <div className="m-auto flex min-h-screen w-full max-w-full flex-col items-center justify-center text-center font-['PixelFont',sans-serif]">
        <h1 className="text-7xl mb-8">Page not found!</h1>
        <h4 className="text-xl">...Are you sure you're supposed to be here?</h4>
      </div>
    </AnimatePage>
  );
}

export default NotFound;
