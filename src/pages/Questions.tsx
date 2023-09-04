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
import { useGetQuestion, useGetQuestionIds } from '@/api/questions';
import { QUESTIONS_COUNT } from '@/constants/questions';

type Choice = '' | 'a' | 'b';

type Result = {
  questionId?: number;
  choice?: Choice;
}[];

type QueryResult = (string | (string | undefined)[])[];

export default function Questions() {
  const navigate = useNavigate();
  const { pathname, state: idsState } = useLocation();
  const category = pathname.split('/')[2];

  const comment = useInput('');
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<Choice>('');
  const [result, setResult] = useState<Result>([]);
  const [queryResult, setQueryResult] = useState<QueryResult>([]);
  const { data: ids, isError: isIdsError } = useGetQuestionIds(category, idsState);

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

  const init = () => {
    setChoice('');
    comment.onClear();
  };

  const handleChoose = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoadingQuestion || isError) return;
    setChoice(event.currentTarget.id as Choice);
  };

  const handleClickNext = () => {
    setQueryResult((prev) => {
      const choice = isChosenA ? question?.choiceA : question?.choiceB;
      return [...prev, [question?.content, choice]];
    });
    setResult((prev) => [...prev, { questionId: currentId, choice }]);
    setIndex((prev) => (isLastQuestion ? prev : prev + 1));
    init();
  };

  useEffect(() => {
    if (
      isLastQuestion &&
      queryResult.length === QUESTIONS_COUNT &&
      result.length === QUESTIONS_COUNT
    )
      navigate(`/questions/result?category=${category}`, {
        state: { ids: idsState ? idsState : ids, result, queryResult },
      });
  }, [idsState, ids, result, queryResult, isLastQuestion, category, navigate]);

  useEffect(() => {
    if (isError) toast.error('문제를 불러오지 못했습니다.');
  }, [isError]);

  return (
    <>
      <main className="h-full bg-dark text-primary">
        <section aria-labelledby="question" className="bg-red rounded-b-28 bg-white px-24 pb-24">
          <Navbar question={question?.content} isQuestion />
          <div className="flex items-center justify-between py-12">
            <ProgressBar index={index} />
            <div className="font-14 font-medium text-secondary">
              {index + 1}/{QUESTIONS_COUNT}
            </div>
          </div>
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
