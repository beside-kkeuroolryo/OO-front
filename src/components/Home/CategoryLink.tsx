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
      className={`font-20 flex justify-center rounded-12 bg-dark py-36 font-semibold ${className}`}
    >
      <div>{children}</div>
    </Link>
  );
}
