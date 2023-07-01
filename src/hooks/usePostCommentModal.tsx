import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import PostCommentModal from '@/components/Questions/PostCommentModal';
import useInput, { UseInputReturn } from '@/hooks/useInput';
import { usePostComment } from '@/api/comments';

export default function usePostCommentModal(comment?: UseInputReturn, questionId?: number) {
  const [isOpen, setIsOpen] = useState(false);
  const nickname = useInput('');
  const password = useInput('');
  const inputRef = useRef(null);
  const { mutate } = usePostComment(questionId);

  const handlePostComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.value.length === 0 || password.value.length < 4) return;

    const inputElement = inputRef.current as unknown;
    const passwordInputElement = inputElement as HTMLInputElement;
    passwordInputElement?.blur();

    mutate(
      { username: nickname?.value, password: password?.value, content: comment?.value },
      {
        onSuccess: () => {
          handleClose();
          comment?.onClear();
        },
        onError: () => {
          toast.error('댓글 작성에 실패했습니다.', { position: 'top-right' });
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
      ref={inputRef}
      isOpen={isOpen}
      nickname={nickname}
      password={password}
      onClose={handleClose}
      onPostComment={handlePostComment}
    />
  );

  return [renderPostCommentModal, handleOpen, handleClose];
}
