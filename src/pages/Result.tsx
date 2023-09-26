import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/Result/Card';
import { ReactComponent as Home } from '@/assets/icons/home.svg';
import { ReactComponent as Share } from '@/assets/icons/share.svg';
import { ReactComponent as Retry } from '@/assets/icons/retry.svg';
import useCustomToast from '@/hooks/useCustomToast';
import { USERMADE } from '@/constants/questions';
import { usePostResult } from '@/api/questions';

type ButtonsTuple = [React.FC<React.SVGProps<SVGSVGElement>>, string, () => void];

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const [shareUrl, setShareUrl] = useState('');

  const customToast = useCustomToast();
  const isToasted = useRef(false);
  const { mutate } = usePostResult();

  const [idsState, resultData, resultQueryState] = [state?.ids, state?.result, state?.queryResult];
  const resultQueryString = searchParams.get('r');
  const idsQueryString = searchParams.get('i');
  const category = searchParams.get('category');

  const result: string[][] = resultQueryState
    ? resultQueryState
    : JSON.parse(resultQueryString ? resultQueryString : '[]');

  const ids = idsState ? idsState : JSON.parse(idsQueryString ? idsQueryString : '[]');

  const share = (data: ShareData) => {
    try {
      navigator.share(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            공유에 실패했습니다.
            <br />
            {error.message && error.message}
          </div>,
        );
      }
      copy();
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('클립보드에 복사되었습니다.');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            복사에 실패했습니다.
            <br />
            {error.message && error.message}
          </div>,
        );
      }
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    navigate(`/questions/${category}`, { state: idsState });
  };

  const handleShare = async () => {
    const data: ShareData = {
      title: '골라바 게임 완료!',
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(data)) {
      return share(data);
    }
    return copy();
  };

  useEffect(() => {
    const generateUrl = () => {
      const query = new URLSearchParams();
      query.append('i', JSON.stringify(ids));
      query.append('r', JSON.stringify(resultQueryState));
      setShareUrl(`${window.location.href}&${query.toString()}`);
    };
    generateUrl();
  }, [ids, resultQueryState]);

  useEffect(() => {
    if (resultData) {
      mutate(resultData, { onError: () => toast.error('결과 전송에 실패했습니다.') });
    }
  }, [resultData, mutate]);

  useEffect(() => {
    if (category === USERMADE && !isToasted.current) {
      customToast.alertUpdate();
      isToasted.current = true;
    }
  }, [category, customToast]);

  return (
    <main className="h-full bg-dark text-primary">
      <section aria-labelledby="finish" className="rounded-b-28 bg-white">
        <Navbar isResult className="px-24" />
        <div className="flex flex-col items-center gap-32 bg-[url('../assets/images/finish.svg')] bg-cover bg-top bg-no-repeat pb-[2.63rem] pt-12">
          <div className="flex flex-col gap-8">
            <h1 id="finish" className="font-22 mx-auto font-bold">
              골라바 게임 완료!
            </h1>
            <div className="font-16 font-semibold text-secondary">선택한 결과를 확인해볼까요?</div>
          </div>
          <ul className="font-16 flex w-full justify-center gap-26 font-semibold">
            {(
              [
                [Home, '메인으로', handleGoHome],
                [Share, '공유하기', handleShare],
                [Retry, '다시하기', handleRetry],
              ] as ButtonsTuple[]
            ).map(([Icon, text, handler]) => {
              return (
                <li key={text}>
                  <button
                    aria-label={text}
                    type="button"
                    className="mx-auto mb-8 flex h-[4.67rem] w-[4.67rem] items-center justify-center rounded-100 bg-dark text-cyan"
                    onClick={handler}
                  >
                    <Icon aria-hidden={true} />
                  </button>
                  {text}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section
        aria-label="게임 결과"
        className="font-16 break-keep bg-dark px-24 py-16 font-medium"
      >
        <ul className="flex flex-col gap-10">
          {result.length > 0 &&
            result?.map(([question, choice], index) => (
              <Card key={ids[index]} question={question} choice={choice} />
            ))}
        </ul>
      </section>
    </main>
  );
}
