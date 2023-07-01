import Button from '@/components/common/Button';
import Modal, { ModalProps } from '@/components/common/Modal';
import { UseInputReturn } from '@/hooks/useInput';
import { MAX_PASSWORD_LENGTH } from '@/constants/constants';

type DeleteCommentModalProps = {
  nickname?: string;
  password?: UseInputReturn;
  onDeleteComment?: React.FormEventHandler<HTMLFormElement>;
} & ModalProps;

export default function DeleteCommentModal({
  nickname,
  password,
  onClose,
  onDeleteComment,
  ...props
}: DeleteCommentModalProps) {
  const handleLimitPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.length > MAX_PASSWORD_LENGTH) {
      event.target.value = input.slice(0, MAX_PASSWORD_LENGTH);
    }
    password?.onChange(event);
  };

  return (
    <Modal className="relative" onClose={onClose} {...props}>
      <form
        className="font-18 flex flex-col gap-24 bg-white p-24 font-semibold"
        onSubmit={onDeleteComment}
      >
        <div className="flex flex-col gap-8">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            defaultValue={nickname}
            placeholder="1자리 이상 입력해주세요"
            className="font-16 w-[29rem] rounded-12 bg-background p-16 font-medium text-placeholder"
            disabled
          />
        </div>
        <div className="flex flex-col gap-8">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password?.value}
            onInput={handleLimitPassword}
            placeholder="4자리 이상 입력해주세요"
            className="font-16 w-[29rem]  rounded-12 bg-background p-16 font-medium"
          />
        </div>
        <Button type="submit" className="font-16 mt-4 self-end px-20 py-14">
          삭제하기
        </Button>
      </form>
    </Modal>
  );
}
