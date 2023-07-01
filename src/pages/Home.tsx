import { Link } from 'react-router-dom';
import CategoryLink from '@/components/Home/CategoryLink';
import Navbar from '@/components/common/Navbar';

const bgConfig = 'bg-[url(@/assets/images/home.png)]';

export default function Home() {
  return (
    <div className="h-full text-white">
      <header className={`h-[39rem] w-full rounded-b-[2.8rem] bg-dark bg-center px-24 ${bgConfig}`}>
        <Navbar isHome={true} />
        <h1 className="font-24 mb-8 mt-18 font-bold">
          <span className="text-cyan">골라바</span>에서 <span className="text-cyan">골라바!</span>
          <br /> 어떤 선택을 하실건가요?
        </h1>
        <div className="font-16 font-semibold">골라바 게임을 시작해 보세요. 😎</div>
      </header>
      <main className="flex flex-col gap-16 px-24 py-24">
        <div className="flex gap-16">
          <CategoryLink to="/questions/self" className="w-1/2">
            셀프
          </CategoryLink>
          <CategoryLink to="/questions/couple" className="w-1/2">
            커플
          </CategoryLink>
        </div>
        <div className="flex gap-16">
          <CategoryLink to="/questions/friend" className="w-1/2">
            친구
          </CategoryLink>
          <CategoryLink to="/questions/random" className="w-1/2">
            랜덤
          </CategoryLink>
        </div>
        <CategoryLink to="/questions/usermade">골라바에 도착한 질문 모음</CategoryLink>
        <Link
          to="/request"
          className="font-14 flex justify-center rounded-50 border border-solid border-placeholder py-14 text-primary"
        >
          만들고 싶은 밸런스 질문이 있어요!
        </Link>
      </main>
    </div>
  );
}
