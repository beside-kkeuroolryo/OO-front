import { ReactComponent as Green } from '@/assets/images/green.svg';

export default function RequestSuccessToast() {
  return (
    <div className="flex gap-12">
      <Green role="presentation" />
      <div className="flex flex-col gap-6">
        <div className="font-14 font-medium text-secondary">더 재밌는 골라바가 될게요</div>
        <div className="font-17 font-semibold">입력하신 질문이 전송됐어요!</div>
      </div>
    </div>
  );
}
