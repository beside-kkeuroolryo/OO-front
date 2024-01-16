import { useCallback, useState } from 'react';
import ConfirmDeleteModal from '@/components/My/ConfirmDeleteModal';
import { SavedQuestionType } from '@/types/questions';

type useConfirmDeleteQuestionsModalProps = {
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  setQuestions: React.Dispatch<React.SetStateAction<SavedQuestionType[]>>;
};

export default function useConfirmDeleteQuestionsModal({
  selectedIds,
  setSelectedIds,
  setQuestions,
}: useConfirmDeleteQuestionsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestions((prev) => prev.filter((question) => !selectedIds.includes(question.id)));
    setSelectedIds([]);
    handleClose();
  };
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderConfirmDeleteQuestionsModal = () => (
    <ConfirmDeleteModal isOpen={isOpen} onDelete={handleDelete} onClose={handleClose} />
  );

  return [renderConfirmDeleteQuestionsModal, handleOpen, handleClose];
}
