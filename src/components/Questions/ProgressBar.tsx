import getQuestionRatios from '@/utils/getQuestionRatios';

const questionRatios = getQuestionRatios();

export default function ProgressBar({ index }: { index: number }) {
  return (
    <div className="h-14 w-[88%] rounded-48 bg-dark">
      <div
        style={{ width: questionRatios[index] }}
        className={`h-full rounded-48 bg-cyan transition-all duration-500 ease-out`}
      ></div>
    </div>
  );
}
