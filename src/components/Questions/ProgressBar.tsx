import getQuestionRatios from '@/utils/getQuestionRatios';
import { QUESTIONS_COUNT } from '@/constants/questions';

const questionRatios = getQuestionRatios();

export default function ProgressBar({ index }: { index: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={index + 1}
      aria-valuemin={1}
      aria-valuemax={QUESTIONS_COUNT}
      className="flex items-center justify-between py-12"
    >
      <div className="h-10 w-[88%] rounded-48 bg-dark">
        <div
          style={{ width: questionRatios[index] }}
          className={`h-full rounded-48 bg-cyan transition-all duration-500 ease-out`}
        ></div>
      </div>
      <div className="font-14 font-medium text-secondary">
        {index + 1}/{QUESTIONS_COUNT}
      </div>
    </div>
  );
}
