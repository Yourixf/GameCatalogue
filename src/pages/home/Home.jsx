import React from 'react';
import './Home.css';

import Button from '../../components/button/Button';
import recommended from "../../assets/navbar/recommended.png";
import CircleIcon from '../../components/circleIcon/CircleIcon';

function Home () {
    return(
        <> 
        <div className='outer-container'>
            <h1>HOME </h1>
            <Button content='test'/>
            <CircleIcon className='test-icon' iconPictureSource={recommended}/>
        </div>
        </>
    );
}

export default Home;