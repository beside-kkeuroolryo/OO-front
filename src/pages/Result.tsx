import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '@/components/common/Button';
import Navbar from '@/components/common/Navbar';
import { ReactComponent as Bullet } from '@/assets/icons/bullet.svg';

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [shareUrl, setShareUrl] = useState('');

  const [idsState, resultData, resultQueryState] = [state?.ids, state?.result, state?.queryResult];
  const category = searchParams.get('category');

  const result: string[][] = resultQueryState;

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    navigate(`/questions/${category}`, { state: idsState });
  };

  useEffect(() => {
    const generateUrl = () => {
      const query = new URLSearchParams();
      query.append('i', JSON.stringify(idsState));
      query.append('r', JSON.stringify(resultQueryState));
      setShareUrl(`${window.location.href}&${query.toString()}`);
    };
    generateUrl();
  }, [idsState, resultQueryState]);

  return (
    <main className="h-full text-primary">
      <section aria-labelledby="finish" className="px-24">
        <Navbar isResult />
        <div className="flex flex-col items-center gap-32 py-16">
          <div className="flex flex-col gap-8">
            <h1 id="finish" className="font-22 mx-auto font-bold">
              골라바 게임 완료!
            </h1>
            <div className="font-16 font-semibold text-secondary">선택한 결과를 확인해볼까요?</div>
          </div>
          <div className="font-16 flex w-full flex-col gap-8 font-semibold">
            <div className="flex gap-8">
              <Button onClick={handleGoHome} className="w-full py-18">
                홈으로 돌아가기
              </Button>
              <CopyToClipboard text={shareUrl}>
                <Button className="w-full py-18">링크 복사하기</Button>
              </CopyToClipboard>
            </div>
            <Button variant="ghost" onClick={handleRetry} className="w-full py-18">
              같은 질문 다시하기
            </Button>
          </div>
        </div>
      </section>
      <section
        aria-label="게임 결과"
        className="font-16 break-keep bg-dark px-24 py-16 font-medium"
      >
        <ul className="flex flex-col gap-10">
          {result.length > 0 &&
            result?.map(([question, choice]) => (
              <li key={question} className="flex flex-col gap-8 rounded-12 bg-white p-16">
                <div className="flex">
                  <Bullet role="img" aria-label="불릿 포인트" className="shrink-0 text-dark" />
                  {question}
                </div>
                <div className="flex">
                  <Bullet role="img" aria-label="불릿 포인트" className="text-cyan" />
                  {choice}
                </div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
