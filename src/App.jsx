import {useState, createContext, useContext} from 'react';

import './App.css';
import Navigation from './components/navigation/Navigation';
import Home from './pages/home/Home';
import Favorites from './pages/favorites/Favorites';
import Recommendations from './pages/recommendations/Recommendations';
import Results from './pages/results/Results';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFound from './pages/404/404';
import Test from './pages/test/Test.jsx'
import {Routes, Route} from 'react-router-dom';
import { ThemeContext } from "./context/ThemeProvider.jsx";



function App() {
  const { selectedTheme } = useContext(ThemeContext)

  return (
    <>
      <Navigation/>
        <div className={`page-container ${selectedTheme}`}>

          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/recommendations' element={<Recommendations/>}/>
            <Route path='/results' element={<Results/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/test' element={<Test/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
    </>
  )
}

export default App;
