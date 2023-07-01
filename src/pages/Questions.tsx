import { useState } from 'react';
import ProgressBar from '@/components/Questions/ProgressBar';
import Button from '@/components/common/Button';
import Navbar from '@/components/common/Navbar';
import Option from '@/components/Questions/Option';
import Comments from '@/components/Questions/Comments';
import useInput from '@/hooks/useInput';
import { QUESTIONS_COUNT } from '@/constants/constants';
import CommentForm from '@/components/Questions/CommentForm';

const q = {
  content: '친구의 깻잎 10장이 붙었다면 내 애인이 떼줘도 된다?',
  choiceA: '그정도는 괜찮아!',
  choiceB: '절대 불가능',
  ratioA: '70',
  ratioB: '30',
};

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

type Choice = '' | 'a' | 'b';

export default function Questions() {
  const [index, setIndex] = useState(0);
  const [chosenItem, setChosenItem] = useState<Choice>('');
  const comment = useInput('');

  const currentId = ids?.[index];

  const hasChosen = chosenItem !== '';
  const isChosenA = chosenItem === 'a';
  const isChosenB = chosenItem === 'b';

  const init = () => {
    setChosenItem('');
    comment.onClear();
  };

  const handleChoose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChosenItem(event.currentTarget.id as Choice);
  };

  const handleClickNext = () => {
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
                {q.content}
              </h1>
            </div>
            <div className="flex flex-col gap-12">
              <Option
                id="a"
                content={q.choiceA}
                hasChosen={hasChosen}
                isChosen={isChosenA}
                ratio={q.ratioA}
                onClick={handleChoose}
              />
              <Option
                id="b"
                content={q.choiceB}
                hasChosen={hasChosen}
                isChosen={isChosenB}
                ratio={q.ratioB}
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
