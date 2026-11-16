import { RingLoader } from "react-spinners";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingSpinner = ({
  size = 60,
  color,
  className,
}: LoadingSpinnerProps) => {
  return (
    <RingLoader
      color="currentColor"
      cssOverride={{
        color: color ? color : "var(--secondary-foreground)",
      }}
      className={className}
      size={size}
    />
  );
};

export default LoadingSpinner;
