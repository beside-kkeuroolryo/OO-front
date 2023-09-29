import { Link } from 'react-router-dom';
import CategoryLink from '@/components/Home/CategoryLink';
import Navbar from '@/components/common/Navbar';
import { ReactComponent as Memo } from '@/assets/icons/memo.svg';
import { CATEGORIES, categoryKeys } from '@/constants/categories';

export default function Home() {
  return (
    <div className="h-full bg-dark">
      <header className={`w-full bg-dark bg-center px-default text-white`}>
        <Navbar isHome={true} />
        <h1 className="font-24 mb-8 mt-20 font-bold">
          <span className="text-cyan">골라바</span>에서 <span className="text-cyan">골라바!</span>
          <br /> 어떤 선택을 하실건가요?
        </h1>
        <div className="font-16 font-semibold text-tertiary">골라바 게임을 시작해 보세요. 😎</div>
      </header>
      <main className="flex flex-col items-center gap-16 bg-dark px-default pb-[2.7rem] pt-30 text-dark">
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
      </main>
    </div>
  );
}
