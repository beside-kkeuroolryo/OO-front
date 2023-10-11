import { Link } from 'react-router-dom';

type CategoryLinkProps = {
  children?: React.ReactNode;
  to?: string;
  className?: string;
};

export default function CategoryLink({ children, to = '/', className }: CategoryLinkProps) {
  return (
    <Link
      to={to}
      className={`flex w-full items-center justify-between rounded-12 bg-white px-20 py-12 ${className}`}
    >
      {children}
    </Link>
  );
}
