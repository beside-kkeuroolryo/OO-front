import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { SavedQuestionType } from '@/types/questions';

const key = 'questions';
const defaultValue: SavedQuestionType[] = [];

export default function useQuestionsLocalStorage(): [
  SavedQuestionType[],
  React.Dispatch<React.SetStateAction<SavedQuestionType[]>>,
] {
  const [questions, setQuestions] = useState<SavedQuestionType[]>(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(questions));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            저장에 실패했습니다.
            <br />
            {error.message && error.message}
          </div>,
        );
      }
    }
  }, [questions]);

  return [questions, setQuestions];
}
