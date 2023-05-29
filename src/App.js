
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";



import Login from "./frontend/pages/Login";
import Home from "./frontend/pages/Home";
import About from "./frontend/pages/About";
import BonafideGenerator from './frontend/pages/BonafideGenerator';
import CircularUpload from './frontend/pages/CircularUpload';
import LoginPage from './frontend/pages/LoginPage';
import AddBonafide from './frontend/pages/AddBonafide';
import AddCircular from './frontend/pages/AddCircular';
import Remainders from './frontend/pages/Remainders';
import SearchBonafide from './frontend/pages/SearchBonafide';

function App() {
  return (
    <div>
      
    
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
      <Route path='/Home' element={<Home/>} />
      <Route path='/loginPage' element={<LoginPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/bonafide-generator' element={<AddBonafide/>} />
        <Route path='/search-bonafide' element={<SearchBonafide/>} />
        <Route path='/circular-upload' element={<AddCircular/>} />
        <Route path='/remainders' element={<Remainders/>} />
      </Routes>
    
   
    </div>
  );
}

export default App;
