import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MovieDetailPage from './components/MovieDetailPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<>  <Navbar />  <Home /> </>} exact />
          <Route path='/:id' element={<>  <Navbar />  <MovieDetailPage /> </>} exact />
        </Routes>
      </BrowserRouter>



    </div>

  );
}

export default App;

