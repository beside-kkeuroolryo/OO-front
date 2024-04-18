import Button from '@/components/common/Button';
import Modal, { ModalProps } from '@/components/common/Modal';

type ConfirmDeleteModalProps = {
  onDelete: React.FormEventHandler;
} & ModalProps;

export default function ConfirmDeleteModal({
  onDelete,
  onClose,
  ...props
}: ConfirmDeleteModalProps) {
  return (
    <Modal aria-label="저장된 질문 삭제 확인 모달" className="p-40" onClose={onClose} {...props}>
      <form
        className="font-18 flex w-full flex-col gap-36 bg-white font-semibold"
        onSubmit={onDelete}
      >
        <div className="flex w-[26.2rem] flex-col items-center gap-10">
          <div className="font-20">정말 삭제하실 건가요?</div>
          <div className="font-15 font-normal text-secondary">
            삭제한 질문은 다시 찾기 어려울 수 있어요!
          </div>
        </div>
        <div className="font-17 flex gap-12 font-semibold">
          <Button
            type="button"
            rounded={true}
            variant="disabled"
            onClick={onClose}
            className="font-16 mt-4 w-full border border-solid border-cancelborder px-20 py-14 text-cancel"
          >
            취소하기
          </Button>
          <Button type="submit" rounded={true} className="font-16 mt-4 w-full px-20 py-14">
            삭제하기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
