import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ResultToPost, ResultToRender } from '@/pages/Questions';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/Result/Card';
import useCustomToast from '@/hooks/useCustomToast';
import useSharedData from '@/hooks/useSharedData';
import { USERMADE } from '@/constants/questions';
import { usePostResult } from '@/api/questions';
import { ReactComponent as Home } from '@/assets/icons/home.svg';
import { ReactComponent as Share } from '@/assets/icons/share.svg';
import { ReactComponent as Retry } from '@/assets/icons/retry.svg';

type ButtonsTuple = [React.FC<React.SVGProps<SVGSVGElement>>, string, () => void];

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { shortUrl } = useParams();

  const customToast = useCustomToast();
  const isToasted = useRef(false);

  const { mutate } = usePostResult();
  const { sharedIds, sharedResult } = useSharedData(shortUrl || '', !state?.resultToRender);

  const [idsState, resultToPost, resultToRender]: [number[], ResultToPost, ResultToRender] = [
    state?.ids,
    state?.resultToPost,
    state?.resultToRender,
  ];

  const category = state?.category;
  const result = resultToRender ? resultToRender : sharedResult;
  const ids = idsState ? idsState : sharedIds;

  const shareUrl = window.location.origin + `/result/${shortUrl}`;

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
    navigate(`/retry`, { state: ids });
  };

  const handleShare = async () => {
    const data: ShareData = {
      title: '골라바 게임 완료!',
      url: shareUrl,
    };

    if (navigator['share'] && navigator.canShare && navigator.canShare(data)) {
      return share(data);
    }
    return copy();
  };

  useEffect(() => {
    if (resultToPost) {
      mutate(resultToPost, {
        onSuccess: () =>
          navigate(location.pathname, { state: { ids: idsState, resultToRender }, replace: true }),
        onError: () => toast.error('결과 전송에 실패했습니다.'),
      });
    }
  }, [resultToPost, idsState, resultToRender, mutate, navigate]);

  useEffect(() => {
    if (category === USERMADE && !isToasted.current) {
      customToast.alertUpdate();
      isToasted.current = true;
    }
  }, [category, customToast]);

  return (
    <main className="h-full bg-dark text-primary">
      <section aria-labelledby="finish" className="rounded-b-28 bg-white">
        <Navbar isResult className="px-default" />
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
        className="font-16 break-keep bg-dark px-default py-16 font-medium"
      >
        <ul className="flex flex-col gap-10">
          {result.length > 0 &&
            result?.map(
              ([question, choice], index) =>
                question && choice && <Card key={ids[index]} question={question} choice={choice} />,
            )}
        </ul>
      </section>
    </main>
  );
}
