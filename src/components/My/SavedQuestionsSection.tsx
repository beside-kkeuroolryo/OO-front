import QuestionItem from '@/components/My/QuestionItem';
import { categoryKeys, CategoryKeys, DISPLAYED_CATEGORIES } from '@/constants/categories';
import type { DisplayedCategory } from '@/constants/categories';
import { ReactComponent as Blue } from '@/assets/images/blue.svg';
import { SavedQuestionType } from '@/types/questions';

const DISPLAYED_CATEGORY_MAP = {
  ALL: 'all',
  ...Object.fromEntries(
    DISPLAYED_CATEGORIES.slice(1).map((category, index) => [category, categoryKeys[index]]),
  ),
} as Record<DisplayedCategory, 'all' | CategoryKeys>;

type SavedQuestionsSectionProps = {
  questions: SavedQuestionType[];
  selectedCategory: DisplayedCategory;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function SavedQuestionsSection({
  questions,
  selectedCategory,
  selectedIds,
  setSelectedIds,
}: SavedQuestionsSectionProps) {
  const filteredQuestions =
    selectedCategory === 'ALL'
      ? questions
      : questions.filter(
          (question) => question.category === DISPLAYED_CATEGORY_MAP[selectedCategory],
        );

  const handleToggleCheckbox = (questionId: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((value) => value !== questionId);
      }
      return [...prev, questionId];
    });
  };

  return (
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
          <div className="font-18 mt-10 font-normal text-tertiary">아직 저장한 질문이 없어요!</div>
        </div>
      ) : (
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
      )}
    </section>
  );
}
