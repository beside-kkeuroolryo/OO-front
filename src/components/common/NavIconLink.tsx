import { Link } from 'react-router-dom';

type NavIconButtonProps = {
  Icon?: React.ReactNode;
  to?: string;
  onClick?: React.MouseEventHandler;
  className?: string;
};

export default function NavIconButton({
  Icon,
  to = '/',
  onClick,
  className = '',
}: NavIconButtonProps) {
  return (
    <Link to={to} onClick={onClick} className={`widen ${className}`}>
      {Icon}
    </Link>
  );
}
