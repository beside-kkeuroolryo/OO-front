import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="mx-auto max-w-[39rem]">
      <Routes>
        <Route path="/" element={<>APP</>} />
      </Routes>
    </div>
  );
}

export default App;
