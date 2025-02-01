import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Home from './pages/home/Home';
import Favorites from './pages/favorites/Favorites';
import Recommendations from './pages/recommendations/Recommendations';
import Results from './pages/results/Results';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFound from './pages/404/404';

import {Routes, Route} from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/recommendations' element={<Recommendations/>}/>
        <Route path='/recommendations' element={<Recommendations/>}/>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </>
  )
}

export default App;
