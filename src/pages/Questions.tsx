import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProgressBar from '@/components/Questions/ProgressBar';
import Button from '@/components/common/Button';
import Navbar from '@/components/common/Navbar';
import Option from '@/components/Questions/Option';
import Comments from '@/components/Questions/Comments';
import useInput from '@/hooks/useInput';
import { QUESTIONS_COUNT } from '@/constants/constants';
import CommentForm from '@/components/Questions/CommentForm';
import { useGetQuestion, useGetQuestionIds } from '@/api/questions';

type Choice = '' | 'a' | 'b';

export default function Questions() {
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];

  const [index, setIndex] = useState(0);
  const { data: ids, isLoading: isLoadingIds } = useGetQuestionIds(category);
  const currentId = ids?.[index];
  const { data: question, isLoading: isLoadingQuestion } = useGetQuestion(currentId);

  const [choice, setChoice] = useState<Choice>('');
  const [result, setResult] = useState<{ questionId?: number; choice?: Choice }[]>([]);
  const comment = useInput('');

  const hasChosen = choice !== '';
  const isChosenA = choice === 'a';
  const isChosenB = choice === 'b';

  const isLoading = isLoadingIds && isLoadingQuestion;

  const init = () => {
    setChoice('');
    comment.onClear();
  };

  const handleChoose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChoice(event.currentTarget.id as Choice);
  };

  const handleClickNext = () => {
    setResult((prev) => [...prev, { questionId: currentId, choice }]);
    setIndex((prev) => prev + 1);
    init();
  };

  return (
    <>
      <main className="h-full bg-dark text-primary">
        <section aria-labelledby="question" className="bg-red rounded-b-28 bg-white px-24 pb-24">
          <Navbar isQuestion />
          <div className="flex justify-between py-12">
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
                {question?.content}
              </h1>
            </div>
            <div className="flex flex-col gap-12">
              <Option
                id="a"
                content={question?.choiceA}
                hasChosen={hasChosen}
                isChosen={isChosenA}
                ratio={question?.choiceAResult}
                isLoading={isLoading}
                onClick={handleChoose}
              />
              <Option
                id="b"
                content={question?.choiceB}
                hasChosen={hasChosen}
                isChosen={isChosenB}
                ratio={question?.choiceBResult}
                isLoading={isLoading}
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
        <CommentForm comment={comment} hasChosen={hasChosen} />
      </main>
    </>
  );
}
