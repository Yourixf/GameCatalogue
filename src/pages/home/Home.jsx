import React from 'react';
import './Home.css';

import Button from '../../components/button/Button';
import recommended from "../../assets/navbar/recommended.png";
import CircleIcon from '../../components/circleIcon/CircleIcon';
import GameCard from "../../components/gameCard/GameCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";

function Home () {
    return(
        <> 
        <div className='outer-container'>
            <h1>HOME </h1>
            <GameCard/>
            <Pagination/>

        </div>
        </>
    
    );
}

export default Home;