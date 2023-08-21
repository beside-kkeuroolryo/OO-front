import { useCallback } from 'react';
import { UseInputReturn } from '@/hooks/useInput';
import usePostCommentModal from '@/hooks/usePostCommentModal';
import { ReactComponent as Submit } from '@/assets/icons/submit.svg';
import { COMMENT, MAX_LENGTH, MIN_LENGTH } from '@/constants/inputs';
import { useGetComments } from '@/api/comments';

type CommentForm = {
  comment?: UseInputReturn;
  hasChosen?: boolean;
  questionId?: number;
};

export default function CommentForm({ comment, hasChosen, questionId }: CommentForm) {
  const { refetch } = useGetComments(questionId, false);
  const [renderPostCommentModal, handleOpenModal] = usePostCommentModal(
    comment,
    questionId,
    refetch,
  );

  const isButtonDisabled = !hasChosen || comment?.value.length === 0;

  const handleOpenPostModal = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      handleOpenModal();
    },
    [handleOpenModal],
  );
  return (
    <>
      <form
        className="font-15 fixed bottom-0 flex items-center justify-between bg-white px-24 font-medium"
        onSubmit={handleOpenPostModal}
      >
        <input
          type="text"
          minLength={MIN_LENGTH[COMMENT]}
          maxLength={MAX_LENGTH[COMMENT]}
          value={comment?.value}
          onChange={comment?.onChange}
          placeholder="답변 선택을 해야 입력할 수 있어요."
          className="my-8 w-[86%] rounded-20 bg-background px-16 py-10 placeholder:text-placeholder"
          disabled={!hasChosen}
        />
        <button className="text-dark disabled:text-tertiary" disabled={isButtonDisabled}>
          <Submit role="img" aria-label="댓글달기 모달 열기" />
        </button>
      </form>
      {renderPostCommentModal()}
    </>
  );
}
