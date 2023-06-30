import { useCallback, useState } from 'react';
import PostCommentModal from '@/components/Questions/PostCommentModal';
import useInput, { UseInputReturn } from '@/hooks/useInput';

export default function usePostCommentModal(comment?: UseInputReturn) {
  const [isOpen, setIsOpen] = useState(false);
  const nickname = useInput('');
  const password = useInput('');

  const handlePostComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (nickname.value.length === 0 || password.value.length < 4) return;
    handleClose();
    comment?.onClear();
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
