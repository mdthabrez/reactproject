
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import BonafideGenerator from './pages/BonafideGenerator';
import CircularUpload from './pages/CircularUpload';

function App() {
  return (
    <div>
      
    
      <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/bonafide-generator' element={<BonafideGenerator/>} />
        <Route path='/circular-upload' element={<CircularUpload/>} />
      </Routes>
    
   
    </div>
  );
}

export default App;
