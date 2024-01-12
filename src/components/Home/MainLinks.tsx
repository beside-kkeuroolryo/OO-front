import { Link } from 'react-router-dom';
import CategoryLink from '@/components/Home/CategoryLink';
import { ReactComponent as Memo } from '@/assets/icons/memo.svg';
import { CATEGORIES, categoryKeys } from '@/constants/categories';

export default function MainLinks() {
  return (
    <>
      {categoryKeys.map((category) => {
        const { title, sub, img } = CATEGORIES[category];
        return (
          <CategoryLink key={title} to={`/questions/${category}`}>
            <div className="flex flex-col gap-4">
              <div className="font-20 font-semibold">{title}</div>
              <div className="font-14 font-medium text-primary">{sub}</div>
            </div>
            {img}
          </CategoryLink>
        );
      })}
      <Link
        to="/request"
        className="font-14 mt-8 flex w-fit justify-center gap-6 rounded-50 border border-solid border-placeholder bg-cyan px-20 py-14 font-semibold text-dark"
      >
        <Memo aria-hidden={true} />
        만들고 싶은 밸런스 게임이 있어요!
      </Link>
    </>
  );
}
