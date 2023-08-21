import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteCommentModal from '@/components/Questions/DeleteCommentModal';
import useInput from '@/hooks/useInput';
import { useDeleteComment, useGetComments } from '@/api/comments';

export default function useDeleteCommentModal(
  questionId?: number,
  commentId?: number,
  nickname?: string,
) {
  const [isOpen, setIsOpen] = useState(false);
  const password = useInput('');
  const { mutate } = useDeleteComment(questionId, commentId);
  const { refetch } = useGetComments(questionId);

  const handleDeleteComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.value.length < 4) return;
    mutate(
      { password: password.value },
      {
        onSuccess: () => {
          refetch?.();
          handleClose();
        },
        onError: () => {
          toast.error('댓글 삭제에 실패했습니다.', { position: 'top-right' });
        },
      },
    );
  };

  const handleClose = useCallback(() => {
    password.onClear();
    setIsOpen(false);
  }, [password]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const renderDeleteCommentModal = () => (
    <DeleteCommentModal
      isOpen={isOpen}
      nickname={nickname}
      password={password}
      onClose={handleClose}
      onDeleteComment={handleDeleteComment}
    />
  );

  return [renderDeleteCommentModal, handleOpen, handleClose];
}
