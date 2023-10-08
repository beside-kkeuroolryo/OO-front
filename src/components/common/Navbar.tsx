import { Link, useNavigate } from 'react-router-dom';
import NavIconLink from '@/components/common/NavIconLink';
import useQuestionsLocalStorage from '@/hooks/useQuestionsLocalStorage';
import { SavedQuestionType } from '@/types/questions';
import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { ReactComponent as Back } from '@/assets/icons/back.svg';
import { ReactComponent as Star } from '@/assets/icons/star.svg';
import { ReactComponent as Home } from '@/assets/icons/home.svg';

type NavbarProps = {
  isHome?: boolean;
  isQuestion?: boolean;
  isResult?: boolean;
  isMy?: boolean;
  isRequest?: boolean;
  questionToSave?: SavedQuestionType;
  className?: string;
};

export default function Navbar({
  isHome,
  isQuestion,
  isResult,
  isMy,
  isRequest,
  questionToSave,
  className = '',
}: NavbarProps) {
  className = isResult ? `flex-row-reverse ${className}` : className;

  const navigate = useNavigate();
  const [questions, setQuestions] = useQuestionsLocalStorage();

  const handlGoBack = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleSave = () => {
    if (!questionToSave) return;

    setQuestions((prev) => {
      if (prev.some((savedQuestion) => savedQuestion.id === questionToSave.id)) {
        prev = prev.filter((savedQuestion) => savedQuestion.id !== questionToSave.id);
      } else {
        prev = [...prev, questionToSave];
      }
      return prev;
    });
  };

  return (
    <nav className={`flex items-center justify-between pb-10 pt-12 ${className}`}>
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
          <button
            type="button"
            aria-label="저장"
            onClick={handleSave}
            disabled={!questionToSave?.content}
          >
            <Star
              aria-hidden={true}
              className={`${
                questions.some((question) => question.id === questionToSave?.id)
                  ? 'text-dark'
                  : 'text-tertiary'
              }`}
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
