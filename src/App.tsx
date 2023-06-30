import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Questions from '@/pages/Questions';

function App() {
  return (
    <div className="mx-auto h-full max-w-[39rem]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="questions">
          <Route path="self" element={<Questions />} />
          <Route path="couple" element={<Questions />} />
          <Route path="friends" element={<Questions />} />
          <Route path="random" element={<Questions />} />
          <Route path="custom" element={<Questions />} />
          <Route path="result" element={<Questions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
