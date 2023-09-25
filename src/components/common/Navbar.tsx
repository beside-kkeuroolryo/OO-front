import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { ReactComponent as Back } from '@/assets/icons/back.svg';
import { ReactComponent as Star } from '@/assets/icons/star.svg';
import { ReactComponent as Home } from '@/assets/icons/home.svg';
import NavIconLink from '@/components/common/NavIconLink';
import useLocalStorage from '@/hooks/useLocalStorage';

type NavbarProps = {
  isHome?: boolean;
  isQuestion?: boolean;
  isResult?: boolean;
  isMy?: boolean;
  isRequest?: boolean;
  question?: string;
  className?: string;
};

export default function Navbar({
  isHome,
  isQuestion,
  isResult,
  isMy,
  isRequest,
  question,
  className = isResult ? 'flex-row-reverse' : '',
}: NavbarProps) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useLocalStorage('questions', []);

  const handlGoBack = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSave = () => {
    setQuestions((prev: string[]) => {
      if (question) {
        if (prev.includes(question)) {
          prev = prev.filter((value) => value !== question);
        } else {
          prev = [...prev, question];
        }
      }
      return prev;
    });
  };

  return (
    <nav className={`relative flex items-center justify-between pb-[1.1rem] pt-18 ${className}`}>
      {isHome && (
        <>
          <Link to="/" aria-label="골라바 홈">
            <Logo aria-hidden={true} />
          </Link>
          <NavIconLink
            to="/my"
            aria-label="보관함"
            className="text-cyan"
            Icon={<Star aria-hidden={true} />}
          />
        </>
      )}
      {isQuestion && (
        <>
          <NavIconLink
            to="/"
            aria-label="홈"
            Icon={<Home aria-hidden={true} className="text-dark" />}
          />
          <button type="button" aria-label="저장" onClick={handleSave}>
            <Star
              aria-hidden={true}
              className={`${questions.includes(question) ? 'text-dark' : 'text-tertiary'}`}
            />
          </button>
        </>
      )}
      {isResult && (
        <NavIconLink
          to="/my"
          aria-label="보관함"
          className="text-dark"
          Icon={<Star aria-hidden={true} />}
        />
      )}
      {isMy && (
        <>
          <NavIconLink
            aria-label="뒤로가기"
            Icon={<Back aria-hidden={true} />}
            onClick={handlGoBack}
          />
          <h1 className="font-18 center font-semibold text-header">보관함</h1>
        </>
      )}
      {isRequest && (
        <>
          <NavIconLink
            aria-label="뒤로가기"
            Icon={<Back aria-hidden={true} />}
            onClick={handlGoBack}
          />
          <h1 className="font-18 center font-medium text-header">골라바 만들기</h1>
        </>
      )}
    </nav>
  );
}
