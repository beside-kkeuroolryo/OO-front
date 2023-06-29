import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';

function App() {
  return (
    <div className="mx-auto max-w-[39rem]">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
