import { useState } from 'react';
import { ReactComponent as More } from '@/assets/icons/more.svg';
import { Comment } from '@/types/questions';
import useDeleteCommentModal from '@/hooks/useDeleteCommentModal';

type CommentsProps = {
  comments?: Comment[];
};

export default function Comments({ comments }: CommentsProps) {
  const [selectedCommentId, setSelectedCommentID] = useState(-1);
  const [renderDeleteCommentModal, handleOpenModal] = useDeleteCommentModal(
    selectedCommentId,
    comments?.filter(({ id }) => id === selectedCommentId)[0]?.username,
  );

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    setSelectedCommentID(Number(target.dataset.id));
    handleOpenModal();
  };

  return (
    <>
      <section
        aria-label="comments"
        className="flex flex-col gap-8 overflow-scroll bg-dark px-24 pb-60 pt-16"
      >
        {comments?.length === 0 ? (
          <div className="font-16 flex h-full items-center justify-center text-white">
            댓글이 없어요😢
          </div>
        ) : null}
        {comments?.map(({ id, username, content }) => (
          <article key={id} className="flex flex-col gap-10 rounded-12 bg-white p-16">
            <div className="flex justify-between">
              <div className="font-13 font-semibold">{username}</div>
              <button type="button" data-id={id} className="widen" onClick={handleClickMore}>
                <More role="img" aria-label="더보기" />
              </button>
            </div>
            <p className="font-15 font-medium">{content}</p>
          </article>
        ))}
      </section>
      {renderDeleteCommentModal()}
    </>
  );
}
