import { useCallback, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactComponent as Check } from '@/assets/icons/check.svg';
import ConfirmDeleteModal from '@/components/My/ConfirmDeleteModal';

export default function My() {
  const [questions, setQuestions] = useLocalStorage('questions', ['a', 'b']);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCheckbox = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.currentTarget as SVGSVGElement;
    const { id } = target;

    setSelectedIndexes((prev) => {
      if (prev.includes(id)) {
        prev = prev.filter((value) => value !== id);
      } else {
        prev = [...prev, id];
      }
      return prev;
    });
  };

  const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestions(
      questions.filter((_: string, index: string) => !selectedIndexes.includes(String(index))),
    );
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
      <main className="mb-100 flex w-full flex-col gap-16 px-24">
        <Navbar isMy={true} />
        <ul className="flex h-full flex-col gap-8">
          {questions.map((question: string, index: number) => (
            <li className="font-16 flex items-center justify-between gap-16 break-all rounded-12 bg-background p-16 font-medium">
              {question}
              <Check
                id={String(index)}
                role="checkbox"
                aria-checked={selectedIndexes.includes(String(index))}
                className={`widen cursor-pointer ${
                  selectedIndexes.includes(String(index)) ? 'text-dark' : 'text-tertiary'
                }`}
                onClick={handleToggleCheckbox}
              />
            </li>
          ))}
        </ul>
        <Button
          onClick={handleOpenModal}
          style={{ width: '88%', left: '6%' }}
          className="font-18 fixed bottom-34 left-[6.5%] py-[1.9rem] font-semibold"
          disabled={selectedIndexes.length === 0}
        >
          삭제하기
        </Button>
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
