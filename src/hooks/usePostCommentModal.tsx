import { useCallback, useState } from 'react';
import PostCommentModal from '@/components/Questions/PostCommentModal';
import useInput, { UseInputReturn } from '@/hooks/useInput';
import { usePostComment } from '@/api/comments';

export default function usePostCommentModal(comment?: UseInputReturn, questionId?: number) {
  const [isOpen, setIsOpen] = useState(false);
  const nickname = useInput('');
  const password = useInput('');
  const { mutate } = usePostComment(questionId);

  const handlePostComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.value.length === 0 || password.value.length < 4) return;
    mutate(
      { username: nickname?.value, password: password?.value, content: comment?.value },
      {
        onSuccess: () => {
          handleClose();
          comment?.onClear();
        },
      },
    );
  };

  const handleClose = useCallback(() => {
    nickname.onClear();
    password.onClear();
    setIsOpen(false);
  }, [nickname, password]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const renderPostCommentModal = () => (
    <PostCommentModal
      isOpen={isOpen}
      nickname={nickname}
      password={password}
      onClose={handleClose}
      onPostComment={handlePostComment}
    />
  );

  return [renderPostCommentModal, handleOpen, handleClose];
}
