import Button from '@/components/common/Button';

type DeleteButtonProps = {
  selectedIds: number[];
  onClick: () => void;
};

export default function DeleteButton({ selectedIds, onClick }: DeleteButtonProps) {
  return (
    <>
      <Button
        className="font-18 w-full max-w-[calc(var(--max-width)-2*var(--padding))] py-[1.9rem] font-semibold"
        disabled={selectedIds.length === 0}
        onClick={onClick}
      >
        {selectedIds.length === 0 ? '삭제하기' : `${selectedIds.length}개의 질문 삭제하기`}
      </Button>
    </>
  );
}
