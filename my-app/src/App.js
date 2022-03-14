import React,{useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'; 
import Home from './Home';
import Leaderboard from './Leaderboard'; 
import Navbars from './Navbars';
import CSE from './CSE';
import EEE from './EEE';
import ECE from './ECE';
import IT from './IT';
import MECH from './MECH';
import CIVIL from './CIVIL';
import Profile from './Profile';
import All from './All';
function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>  
      <Route path="/Leaderboard" element={<Leaderboard/>}></Route>
      <Route path="/Navbars" element={<Navbars/>}></Route>
      <Route path="/CSE" element={<CSE/>}></Route>
      <Route path="/ECE" element={<ECE/>}></Route>
      <Route path="/EEE" element={<EEE/>}></Route>
      <Route path="/IT" element={<IT/>}></Route>
      <Route path="/MECH" element={<MECH/>}></Route>
      <Route path="/CIVIL" element={<CIVIL/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
      <Route path="/All" element={<All/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
