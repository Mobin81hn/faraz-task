import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Seasons from './pages/Seasons';
import Episodes from './pages/Episodes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/seasons/:id' element={<Seasons/>}/>
          <Route path='/episodes/:id' element={<Episodes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
