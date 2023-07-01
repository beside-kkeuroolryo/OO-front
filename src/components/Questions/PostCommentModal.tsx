import { forwardRef } from 'react';
import Button from '@/components/common/Button';
import Modal, { ModalProps } from '@/components/common/Modal';
import { UseInputReturn } from '@/hooks/useInput';

type PostCommentModalProps = {
  nickname?: UseInputReturn;
  password?: UseInputReturn;
  onPostComment?: React.FormEventHandler<HTMLFormElement>;
} & ModalProps;

const PostCommentModal = forwardRef<HTMLInputElement, PostCommentModalProps>(
  ({ nickname, password, onPostComment, onClose, ...props }, ref) => {
    return (
      <Modal className="relative" onClose={onClose} {...props}>
        <form
          className="font-18 flex flex-col gap-24 bg-white p-24 font-semibold"
          onSubmit={onPostComment}
        >
          <div className="flex flex-col gap-8">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname?.value}
              onInput={nickname?.onChange}
              placeholder="1자리 이상 입력해주세요"
              className="font-16 w-[29rem] rounded-12 bg-background p-16 font-medium"
            />
          </div>
          <div className="flex flex-col gap-8">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              ref={ref}
              value={password?.value}
              onInput={password?.onChange}
              placeholder="4자리 이상 입력해주세요"
              className="font-16 w-[29rem]  rounded-12 bg-background p-16 font-medium"
            />
          </div>
          <Button type="submit" className="font-16 mt-4 self-end px-20 py-14">
            댓글달기
          </Button>
        </form>
      </Modal>
    );
  },
);
export default PostCommentModal;
