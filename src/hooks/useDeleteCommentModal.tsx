import { useCallback, useState } from 'react';
import DeleteCommentModal from '@/components/Questions/DeleteCommentModal';
import useInput from '@/hooks/useInput';

export default function useDeleteCommentModal(commentId?: number, nickname?: string) {
  const [isOpen, setIsOpen] = useState(false);
  const password = useInput('');

  const handleDeleteComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.value.length < 4) return;
    handleClose();
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
