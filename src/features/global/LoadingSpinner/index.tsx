import RingLoader from "react-spinners/RingLoader";

const LoadingSpinner = ({ size = 60 }: { size?: number }) => {
  return (
    <RingLoader
      color="currentColor"
      cssOverride={{ color: "var(--color-secondary-foreground)" }}
      size={size}
    />
  );
};

export default LoadingSpinner;
