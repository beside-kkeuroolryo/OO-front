import { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PostCommentModal from '@/components/Questions/PostCommentModal';
import useInput, { UseInputReturn } from '@/hooks/useInput';
import { usePostComment } from '@/api/comments';

export default function usePostCommentModal(comment?: UseInputReturn, questionId?: number) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const nickname = useInput('');
  const password = useInput('');
  const inputRef = useRef(null);
  const { mutateAsync } = usePostComment(questionId);

  const handlePostComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.value.length === 0 || password.value.length < 4) return;

    const inputElement = inputRef.current as unknown;
    const passwordInputElement = inputElement as HTMLInputElement;
    passwordInputElement?.blur();

    await mutateAsync(
      { username: nickname?.value, password: password?.value, content: comment?.value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([['question', questionId, 'comments']]);
        },
        onError: () => {
          toast.error('댓글 작성에 실패했습니다.', { position: 'top-right' });
        },
        onSettled: () => {
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
