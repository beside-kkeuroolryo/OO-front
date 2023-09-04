import Button from '@/components/common/Button';
import Modal, { ModalProps } from '@/components/common/Modal';
import { UseInputReturn } from '@/hooks/useInput';
import { MAX_LENGTH, MIN_LENGTH, PASSWORD } from '@/constants/inputs';
import { isLessThan } from '@/utils/isLessThan';

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
  const isButtonDisabled =
    isLessThan({ num: password?.value?.length, comparison: MIN_LENGTH[PASSWORD] }) ||
    password?.value.includes(' ');
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
            minLength={MIN_LENGTH[PASSWORD]}
            maxLength={MAX_LENGTH[PASSWORD]}
            value={password?.value}
            onInput={password?.onChange}
            placeholder="4자리 이상 입력해주세요"
            className="font-16 w-[29rem]  rounded-12 bg-background p-16 font-medium"
          />
        </div>
        <Button
          type="submit"
          className="font-16 mt-4 self-end px-20 py-14"
          disabled={isButtonDisabled}
        >
          삭제하기
        </Button>
      </form>
    </Modal>
  );
}
