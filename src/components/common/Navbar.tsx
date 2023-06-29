import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { ReactComponent as Back } from '@/assets/icons/back.svg';
import { ReactComponent as Star } from '@/assets/icons/star.svg';
import { ReactComponent as Home } from '@/assets/icons/home.svg';
import NavIconLink from '@/components/common/NavIconLink';

type NavbarProps = {
  isHome?: boolean;
  isQuestion?: boolean;
  isResult?: boolean;
  isStorage?: boolean;
  isRequest?: boolean;
  className?: string;
};

export default function Navbar({
  isHome,
  isQuestion,
  isResult,
  isStorage,
  isRequest,
  className = isResult ? 'flex-row-reverse' : '',
}: NavbarProps) {
  const navigate = useNavigate();

  const handlGoBack = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <nav className={`relative flex justify-between pb-6 pt-18 ${className}`}>
      {isHome && (
        <>
          <Link to="/">
            <Logo aria-label="로고" />
          </Link>
          <NavIconLink to="/my" Icon={<Star aria-label="보관함" />} />
        </>
      )}
      {isQuestion && (
        <>
          <NavIconLink to="/" Icon={<Home aria-label="홈" />} />
          <NavIconLink to="/my" className="text-tertiary" Icon={<Star aria-label="보관함" />} />
        </>
      )}
      {isResult && <NavIconLink className="text-white" Icon={<Star aria-label="보관함" />} />}
      {isStorage && (
        <>
          <NavIconLink onClick={handlGoBack} Icon={<Back aria-label="뒤로가기" />} />
          <div className="font-18 center font-semibold">보관함</div>
        </>
      )}
      {isRequest && (
        <>
          <NavIconLink onClick={handlGoBack} Icon={<Back aria-label="뒤로가기" />} />
          <div className="font-18 center font-semibold">골라바 만들기</div>
        </>
      )}
    </nav>
  );
}
