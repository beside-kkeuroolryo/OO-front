import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from '@/pages/Home';
import Questions from '@/pages/Questions';
import Result from '@/pages/Result';
import Request from '@/pages/Request';
import My from '@/pages/My';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="mx-auto h-full max-w-mobile">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="request" element={<Request />} />
        <Route path="my" element={<My />} />
        <Route path="questions">
          <Route path="self" element={<Questions />} />
          <Route path="couple" element={<Questions />} />
          <Route path="friend" element={<Questions />} />
          <Route path="random" element={<Questions />} />
          <Route path="usermade" element={<Questions />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        limit={2}
        closeButton={false}
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
}

export default App;
