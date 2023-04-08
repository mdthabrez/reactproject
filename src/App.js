
import './App.css';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import BonafideGenerator from './pages/BonafideGenerator';
import CircularUpload from './pages/CircularUpload';

function App() {
  return (
    <div>
    <Navbar />
    <div>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/bonafide-generator' element={<BonafideGenerator/>} />
        <Route path='/circular-upload' element={<CircularUpload/>} />
      </Routes>
    </div>
    <h1>HI</h1>
    </div>
  );
}

export default App;
