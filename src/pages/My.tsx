import { useCallback, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import ConfirmDeleteModal from '@/components/My/ConfirmDeleteModal';
import QuestionItem from '@/components/My/QuestionItem';
import useQuestionsLocalStorage from '@/hooks/useQuestionsLocalStorage';
import { categoryKeys, CategoryKeys } from '@/constants/categories';
import { ReactComponent as Blue } from '@/assets/images/blue.svg';

const categories = ['ALL', '셀프', '커플', '우정', '랜덤', '같이해요'] as const;
type CategoryType = (typeof categories)[number];

const categoryMap = {
  ALL: 'all',
  ...Object.fromEntries(
    categories.slice(1).map((category, index) => [category, categoryKeys[index]]),
  ),
} as Record<CategoryType, 'all' | CategoryKeys>;

export default function My() {
  const [questions, setQuestions] = useQuestionsLocalStorage();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [isOpen, setIsOpen] = useState(false);
  const filteredQuestions =
    selectedCategory === 'ALL'
      ? questions
      : questions.filter((question) => question.category === categoryMap[selectedCategory]);

  const handleClickCategory = (category: CategoryType) => setSelectedCategory(category);

  const handleToggleCheckbox = (questionId: number) => {
    setSelectedIds((prev) => {
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
    setQuestions((prev) => prev.filter((question) => !selectedIds.includes(question.id)));
    setSelectedIds([]);
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
                  key={category}
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

            {filteredQuestions.length > 0 && (
              <div className="font-14 mb-10 font-semibold text-white">
                {filteredQuestions.length}개의 질문
              </div>
            )}

            {filteredQuestions.length === 0 ? (
              <div className="mt-112 flex flex-col items-center">
                <Blue aria-hidden={true} />
                <div className="font-18 mt-10 font-normal text-tertiary">
                  아직 저장한 질문이 없어요!
                </div>
              </div>
            ) : null}
            <ul className="flex h-full flex-col gap-8">
              {filteredQuestions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  handleCheck={() => handleToggleCheckbox(question.id)}
                  isChecked={selectedIds.includes(question.id)}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="fixed bottom-0 w-full max-w-mobile bg-white px-default py-24">
          <Button
            className="font-18 w-full max-w-[calc(var(--max-width)-2*var(--padding))] py-[1.9rem] font-semibold"
            disabled={selectedIds.length === 0}
            onClick={handleOpenModal}
          >
            {selectedIds.length === 0 ? '삭제하기' : `${selectedIds.length}개의 질문 삭제하기`}
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
