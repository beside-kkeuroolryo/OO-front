import { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import CategoriesSection from '@/components/My/CategoriesSection';
import SavedQuestionsSection from '@/components/My/SavedQuestionsSection';
import type { DisplayedCategory } from '@/constants/categories';
import DeleteButton from '@/components/My/DeleteButton';
import useConfirmDeleteQuestionsModal from '@/hooks/useConfirmDeleteQuestionsModal';
import useQuestionsLocalStorage from '@/hooks/useQuestionsLocalStorage';

export default function My() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DisplayedCategory>('ALL');
  const [questions, setQuestions] = useQuestionsLocalStorage();
  const [renderConfirmDeleteQuestionsModal, handleOpenModal] = useConfirmDeleteQuestionsModal({
    selectedIds,
    setSelectedIds,
    setQuestions,
  });

  return (
    <>
      <main className="flex h-full w-full flex-col bg-dark pt-46">
        <Navbar isMy={true} className="fixed top-0 z-10 w-full max-w-mobile bg-white px-default" />
        <div className="bg-dark px-default pb-[12.2rem]">
          <CategoriesSection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <SavedQuestionsSection
            questions={questions}
            selectedCategory={selectedCategory}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
        <div className="fixed bottom-0 w-full max-w-mobile bg-white px-default py-24">
          <DeleteButton selectedIds={selectedIds} onClick={handleOpenModal} />
        </div>
      </main>
      {renderConfirmDeleteQuestionsModal()}
    </>
  );
}
