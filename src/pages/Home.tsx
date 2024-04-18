import Navbar from '@/components/common/Navbar';
import MainLinks from '@/components/Home/MainLinks';

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
        <MainLinks />
      </main>
    </div>
  );
}
