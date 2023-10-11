import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProgressBar from '@/components/Questions/ProgressBar';
import Button from '@/components/common/Button';
import Navbar from '@/components/common/Navbar';
import Option from '@/components/Questions/Option';
import Comments from '@/components/Questions/Comments';
import CommentForm from '@/components/Questions/CommentForm';
import SpinnerIcon from '@/components/common/SpinnerIcon';
import useInput from '@/hooks/useInput';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { useGetQuestion, useGetQuestionIds } from '@/api/questions';
import { QUESTIONS_COUNT } from '@/constants/questions';
import { SavedQuestionType } from '@/types/questions';
import { usePostConvertToShortUrl } from '@/api/shortUrl';

type Choice = '' | 'a' | 'b';

export type ResultToPost = {
  questionId?: number;
  choice?: Choice;
}[];

export type ResultToRender = (string | undefined)[][];

export default function Questions() {
  const navigate = useNavigate();
  const { pathname, state: idsState } = useLocation();
  const category = pathname.split('/')[2];

  const comment = useInput('');
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<Choice>('');
  const [resultToPost, setResultToPost] = useState<ResultToPost>([]);
  const [resultToRender, setResultToRender] = useState<ResultToRender>([]);

  const { mutate, isLoading } = usePostConvertToShortUrl();
  useLockBodyScroll(isLoading);

  const { data: ids, isError: isIdsError } = useGetQuestionIds(category, !idsState);

  const currentId = idsState ? idsState?.[index] : ids?.[index];
  const {
    data: question,
    isLoading: isLoadingQuestion,
    isError: isQuestionError,
  } = useGetQuestion(currentId);

  const hasChosen = choice !== '';
  const isChosenA = choice === 'a';
  const isChosenB = choice === 'b';
  const isLastQuestion = index === QUESTIONS_COUNT - 1;

  const isError = isIdsError || isQuestionError;

  const questionToSave: SavedQuestionType = {
    id: question?.id || 0,
    category: category || '',
    content: question?.content || '',
    optionA: question?.choiceA || '',
    optionB: question?.choiceB || '',
  };

  const init = () => {
    setChoice('');
    comment.onClear();
  };

  const handleChoose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoadingQuestion || isError) return;
    setChoice(event.currentTarget.id as Choice);
  };

  const handleClickNext = () => {
    setResultToRender((prev) => {
      const choice = isChosenA ? question?.choiceA : question?.choiceB;
      return [...prev, [question?.content, choice]];
    });
    setResultToPost((prev) => [...prev, { questionId: currentId, choice }]);
    setIndex((prev) => (isLastQuestion ? prev : prev + 1));
    init();
  };

  useEffect(() => {
    if (
      isLastQuestion &&
      resultToRender.length === QUESTIONS_COUNT &&
      resultToPost.length === QUESTIONS_COUNT
    ) {
      const dataToShare = JSON.stringify({ ids: ids || idsState, result: resultToRender });
      mutate(dataToShare, {
        onSuccess: (shortUrl) => {
          navigate(`/result/${shortUrl}`, {
            state: { ids: ids || idsState, resultToPost, resultToRender, category },
          });
        },
      });
    }
  }, [idsState, ids, resultToPost, resultToRender, isLastQuestion, category, navigate, mutate]);

  useEffect(() => {
    if (isError) toast.error('질문을 불러오지 못했습니다.');
  }, [isError]);
  console.log(resultToRender);

  return (
    <>
      {isLoading && (
        <div className="absolute left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black bg-opacity-25">
          <SpinnerIcon width={60} height={60} className="text-teal-200" />
        </div>
      )}
      <main className="h-full bg-dark text-primary">
        <section
          aria-labelledby="question"
          className="bg-red rounded-b-28 bg-white px-default pb-24"
        >
          <Navbar questionToSave={questionToSave} isQuestion />
          <ProgressBar index={index} />
          <div className="flex flex-col gap-24">
            <div className="mt-16 flex w-full flex-col items-center gap-8">
              <div className="font-16 font-semibold text-secondary">과연 당신의 선택은?</div>
              <h1
                id="question"
                className="font-22 flex flex-nowrap break-keep px-30 text-center font-bold"
              >
                {isLoadingQuestion ? <SpinnerIcon width={30} height={30} /> : question?.content}
              </h1>
            </div>
            <div className="flex flex-col gap-12">
              <Option
                id="a"
                content={question?.choiceA}
                hasChosen={hasChosen}
                isChosen={isChosenA}
                ratio={question?.choiceAResult}
                isLoading={isLoadingQuestion}
                onClick={handleChoose}
              />
              <Option
                id="b"
                content={question?.choiceB}
                hasChosen={hasChosen}
                isChosen={isChosenB}
                ratio={question?.choiceBResult}
                isLoading={isLoadingQuestion}
                onClick={handleChoose}
              />
            </div>
            <Button
              rounded
              className="font-16 mx-auto px-60 py-16 font-semibold"
              onClick={handleClickNext}
              disabled={!hasChosen}
            >
              다음으로
            </Button>
          </div>
        </section>
        <Comments questionId={currentId} />
        <CommentForm comment={comment} hasChosen={hasChosen} questionId={question?.id} />
      </main>
    </>
  );
}
