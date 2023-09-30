import { useCallback, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import ConfirmDeleteModal from '@/components/My/ConfirmDeleteModal';
import QuestionItem from '@/components/My/QuestionItem';
import useQuestionsLocalStorage from '@/hooks/useQuestionsLocalStorage';

const categories = ['ALL', '셀프', '커플', '우정', '랜덤', '같이해요'] as const;
type CategoryType = (typeof categories)[number];

export default function My() {
  const [questions, setQuestions] = useQuestionsLocalStorage();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickCategory = (category: CategoryType) => setSelectedCategory(category);

  const handleToggleCheckbox = (questionId: number) => {
    setSelectedIndexes((prev) => {
      if (prev.includes(questionId)) {
        prev = prev.filter((value) => value !== questionId);
      } else {
        prev = [...prev, questionId];
      }
      return prev;
    });
  };

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <main className="flex h-full w-full flex-col bg-dark pt-46">
        <Navbar isMy={true} className="fixed top-0 z-10 w-full max-w-mobile bg-white px-default" />
        <div className="bg-dark px-default pb-[12.2rem]">
          <section aria-labelledby="category" className="pb-38 pt-30">
            <h2 id="category" className="a11y-hidden">
              카테고리
            </h2>
            <div className="flex flex-wrap gap-8">
              {categories.map((category) => (
                <button
                  type="button"
                  className={`font-14 rounded-[1rem] px-18 py-10 font-semibold ${
                    category === selectedCategory ? 'bg-cyan text-dark' : 'bg-primary text-tertiary'
                  }`}
                  onClick={() => handleClickCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
          <section aria-labelledby="list">
            <h2 id="list" className="a11y-hidden">
              저장한 질문 리스트
            </h2>
            <div className="font-14 mb-10 font-semibold text-white">
              {questions.length}개의 질문
            </div>
            <ul className="flex h-full flex-col gap-8">
              {questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  handleCheck={() => handleToggleCheckbox(question.id)}
                  isChecked={selectedIndexes.includes(question.id)}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="fixed bottom-0 w-full max-w-mobile bg-white px-default py-24">
          <Button
            className="font-18 w-full max-w-[calc(var(--max-width)-2*var(--padding))] py-[1.9rem] font-semibold"
            disabled={selectedIndexes.length === 0}
            onClick={handleOpenModal}
          >
            삭제하기
          </Button>
        </div>
      </main>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
        className="p-40"
      />
    </>
  );
}
