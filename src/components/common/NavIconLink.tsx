import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type NavIconButtonProps = {
  Icon?: React.ReactNode;
  to?: string;
  onClick?: React.MouseEventHandler;
  className?: string;
} & HTMLAttributes<HTMLAnchorElement>;

export default function NavIconButton({
  Icon,
  to = '/',
  onClick,
  className = '',
  ...props
}: NavIconButtonProps) {
  return (
    <Link to={to} onClick={onClick} className={`widen ${className}`} {...props}>
      {Icon}
    </Link>
  );
}
