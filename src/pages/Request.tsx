import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button';
import Navbar from '@/components/common/Navbar';
import { ReactComponent as Yellow } from '@/assets/images/yellow.svg';
import useCustomToast from '@/hooks/useCustomToast';
import { usePostQuestion } from '@/api/questions';
import useInput from '@/hooks/useInput';

export default function Request() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const choiceA = useInput('');
  const choiceB = useInput('');
  const customToast = useCustomToast();
  const { mutate } = usePostQuestion();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (content.length < 1 || choiceA.value.length < 1 || choiceB.value.length < 1) return;
    mutate(
      { content, choiceA: choiceA.value, choiceB: choiceB.value, category: 'USERMADE' },
      {
        onSuccess: () => {
          customToast.requestSuccess();
          navigate('/');
        },
        onError: () => {
          toast.error('질문 전송에 실패했습니다.');
        },
      },
    );
  };

  const handleInputTextarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    setContent(target.value);
  };

  return (
    <main className="px-default text-primary">
      <Navbar isRequest={true} />
      <form
        onSubmit={handleSubmit}
        className="font-18 mt-24 flex flex-col gap-24 font-semibold placeholder:text-placeholder"
      >
        <div className="flex flex-col gap-8">
          <label htmlFor="question">골라바 질문 주제</label>
          <TextareaAutosize
            id="question"
            minRows={3}
            minLength={1}
            maxLength={100}
            onInput={handleInputTextarea}
            placeholder="골라바 질문 주제를 입력해 주세요."
            className="font-16 w-full resize-none overflow-hidden rounded-12 bg-background p-16 font-medium text-primary"
          />
        </div>
        <div className="flex flex-col gap-8">
          <label htmlFor="selectA">선택 A</label>
          <input
            id="selectA"
            type="text"
            minLength={1}
            value={choiceA.value}
            onInput={choiceA.onChange}
            placeholder="선택A를 입력해 주세요."
            className="font-16 w-full rounded-12 bg-background p-16 font-medium text-primary"
          />
        </div>
        <div className="flex flex-col gap-8">
          <label htmlFor="selectB">선택 B</label>
          <input
            id="selectB"
            type="text"
            minLength={1}
            value={choiceB.value}
            onInput={choiceB.onChange}
            placeholder="선택B를 입력해 주세요."
            className="font-16 w-full rounded-12 bg-background p-16 font-medium text-primary"
          />
        </div>
        <Button variant="primary" type="submit" className="font-16 mx-auto mt-16 px-20 py-14">
          만들어주세요!
        </Button>
      </form>
      <div className="mb-70 mt-138 flex gap-16">
        <div className="font-14 mt-6 h-fit rounded-12 border border-solid border-secondary p-10 text-center font-medium leading-[1.4]">
          골라바에서 질문을 검토한 뒤 만들어 드릴게요!
        </div>
        <Yellow role="img" aria-label="노란색 캐릭터" />
      </div>
    </main>
  );
}
