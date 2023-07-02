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
    <nav className={`relative flex items-center justify-between pb-6 pt-18 ${className}`}>
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
          <button type="button" onClick={handleSave}>
            <Star
              aria-label="저장"
              className={`${questions.includes(question) ? 'text-dark' : 'text-tertiary'}`}
            />
          </button>
        </>
      )}
      {isResult && (
        <NavIconLink to="/my" className="text-dark" Icon={<Star aria-label="보관함" />} />
      )}
      {isMy && (
        <>
          <NavIconLink onClick={handlGoBack} Icon={<Back aria-label="뒤로가기" />} />
          <div className="font-18 center font-semibold text-header">보관함</div>
        </>
      )}
      {isRequest && (
        <>
          <NavIconLink onClick={handlGoBack} Icon={<Back aria-label="뒤로가기" />} />
          <div className="font-18 center font-medium text-header">골라바 만들기</div>
        </>
      )}
    </nav>
  );
}
