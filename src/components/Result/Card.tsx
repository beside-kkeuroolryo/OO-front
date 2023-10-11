import A from '@/components/Result/A';
import Q from '@/components/Result/Q';

type CardProps = {
  question: string;
  choice: string;
};

export default function Card({ question, choice }: CardProps) {
  return (
    <li className="flex flex-col gap-8 rounded-12 bg-white p-16">
      <div className="flex gap-8 font-semibold text-dark">
        <Q />
        {question}
      </div>
      <div className="flex gap-8">
        <A />
        {choice}
      </div>
    </li>
  );
}
