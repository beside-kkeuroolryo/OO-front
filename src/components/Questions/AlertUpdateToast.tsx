import { ReactComponent as Green } from '@/assets/images/green.svg';

export default function AlertUpdateToast() {
  return (
    <div className="flex gap-12">
      <Green role="presentation" />
      <div className="flex flex-col gap-6">
        <div className="font-14 font-medium text-secondary">꾸준히 업데이트 될 예정이에요 :)</div>
        <div className="font-17 font-semibold">새로운 질문들로 다시 만나요!</div>
      </div>
    </div>
  );
}
