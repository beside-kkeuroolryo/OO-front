import { ReactComponent as Check } from '@/assets/icons/check.svg';

type QuestionItemProps = {
  question: string;
  handleCheck: () => void;
  isChecked: boolean;
};

export default function QuestionItem({ question, handleCheck, isChecked }: QuestionItemProps) {
  return (
    <li className="flex flex-col gap-10 break-all rounded-12 bg-background p-14">
      <label className="font-16 flex cursor-pointer items-center justify-between gap-16 font-semibold">
        {question}
        <input type="checkbox" className="a11y-hidden" onChange={handleCheck} />
        <Check aria-hidden="true" className={`${isChecked ? 'text-dark' : 'text-tertiary'}`} />
      </label>
      <div className="h-[0.2px] bg-dark"></div>
      <div className="font-15 flex flex-col gap-6 font-medium text-primary">
        <div className="flex gap-6">
          <span>A.</span>
        </div>
        <div className="flex gap-6">
          <span>B.</span>
        </div>
      </div>
    </li>
  );
}
