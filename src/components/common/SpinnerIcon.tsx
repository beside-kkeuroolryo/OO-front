import { ReactComponent as Spinner } from '@/assets/icons/spinner.svg';

type SpinnerIconProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

export default function SpinnerIcon({ className, ...props }: SpinnerIconProps) {
  return (
    <Spinner
      role="alert"
      aria-label="loading"
      className={`animate-spin ${className}`}
      {...props}
    ></Spinner>
  );
}
