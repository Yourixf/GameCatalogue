import {Routes, Route, Navigate} from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Home from './pages/home/Home';
import Favorites from './pages/favorites/Favorites';
import Recommendations from './pages/recommendations/Recommendations';
import Results from './pages/results/Results';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from "./pages/profile/Profile.jsx";
import NotFound from './pages/404/404';
import GameDetails from "./pages/gameDetails/GameDetails.jsx";
import ChangePassword from "./pages/changePassword/ChangePassword.jsx";
import ChangeProfilePicture from "./pages/changeProfilePicture/ChangeProfilePicture.jsx";
import {useAuthData} from "./helpers/user.js";
import StatusMessage from './components/statusMessage/StatusMessage.jsx';
import './App.css';


function App() {
    const authData = useAuthData();
 

    function checkEnvVars() {

      const NOVI_URL = import.meta.env.VITE_NOVI_API_BASE_URL;
      const NOVI_API_KEY = import.meta.env.VITE_NOVI_API_KEY;
      const RAWG_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
      const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
     

    
      const validValues = !!NOVI_URL && !!NOVI_API_KEY && !!RAWG_URL && !!RAWG_API_KEY
      console.log(!!NOVI_URL && !!NOVI_API_KEY && !!RAWG_URL && !!RAWG_API_KEY)
      
      return validValues
    }
  
    const envError = checkEnvVars();

    if (!envError) {
      return (
        <main className={`env-error-page-container`}>
          <StatusMessage statusState={true} type={"error"} content={`Environment variabelen zijn onjuist, controleer deze.`}/>
            
        </main>
      )
    } else {


        return (
          <>
            <Navigation/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/favorites' element={authData?.user ? <Favorites/> : <Navigate to="/login"/>}/>
              <Route path='/recommendations' element={authData?.user ? <Recommendations/> : <Navigate to="/login"/>}/>
              <Route path='/results/:query' element={<Results/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/profile' element={authData?.user ? <Profile/> : <Navigate to="/login"/>}/>
              <Route path='/profile/changepassword' element={authData?.user ? <ChangePassword/> : <Navigate to="/login"/>}/>
              <Route path='/profile/changeprofilepicture' element={authData?.user ? <ChangeProfilePicture/> : <Navigate to='/login'/>}/>
              <Route path='/game/:id' element={<GameDetails/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </>
      )
    }
}

export default App;