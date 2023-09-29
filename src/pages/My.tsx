import { useCallback, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import ConfirmDeleteModal from '@/components/My/ConfirmDeleteModal';
import QuestionItem from '@/components/My/QuestionItem';
import useLocalStorage from '@/hooks/useLocalStorage';

const categories = ['ALL', '셀프', '커플', '우정', '랜덤', '같이해요'] as const;
type CategoryType = (typeof categories)[number];

export default function My() {
  const [questions, setQuestions] = useLocalStorage('questions', []);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickCategory = (category: CategoryType) => setSelectedCategory(category);

  const handleToggleCheckbox = (index: number) => {
    setSelectedIndexes((prev) => {
      if (prev.includes(index)) {
        prev = prev.filter((value) => value !== index);
      } else {
        prev = [...prev, index];
      }
      return prev;
    });
  };

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestions(questions.filter((_: string, index: number) => !selectedIndexes.includes(index)));
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
      <main className="mb-100 mt-46 flex h-full w-full flex-col">
        <Navbar isMy={true} className="fixed top-0 z-10 w-full max-w-[39rem] bg-white px-24" />
        <div className="bg-dark px-24 pb-[12.2rem]">
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
            <h2 id="list" className="a11y-hidden max-w-">
              저장한 질문 리스트
            </h2>
            <div className="font-14 mb-10 font-semibold text-white">2개의 질문</div>
            <ul className="flex h-full flex-col gap-8">
              {questions.map((question: string, index: number) => (
                <QuestionItem
                  question={question}
                  handleCheck={() => handleToggleCheckbox(index)}
                  isChecked={selectedIndexes.includes(index)}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="fixed bottom-0 w-full max-w-[39rem] bg-white p-24">
          <Button
            className="font-18 w-full max-w-[34.2rem] py-[1.9rem] font-semibold"
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
