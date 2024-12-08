import { Outlet } from 'react-router-dom'
import Logo from "../Logo/Logo"
import NavbarLink from '../NavbarLink/NavbarLink';

import foodPath from '../../assets/food.jsx';
import exercisePath from '../../assets/exercises.jsx';
import friendsPath from '../../assets/friends.jsx';
import homePath from '../../assets/home.jsx'; 

import { useState } from 'react';
import UserProfile from '../UserProfile/UserProfile.jsx';

function Navbar() {
    const [chosenLinks, setChosenLinks] = useState({
        'Home': true, 
        'Exercises': false, 
        'Food': false, 
        'Friends': false}
    );

    function handleClick(name) {
        setChosenLinks({
            Home: false,
            Exercises: false,
            Food: false,
            Friends: false,
            [name]: true, 
        });
    }

    return (
        <div>
            <div className='flex flex-row justify-between mx-8 py-5 align-center'>
                <Logo />
                <ul className='card flex flex-row gap-10 px-10'>
                    <NavbarLink onClick={() => handleClick("Home")} 
                        chosen={chosenLinks["Home"]} 
                        viewBox={"0 0 512 448"}
                        to="/" 
                        name='Home' 
                        iconPath={homePath}/>
                    <NavbarLink onClick={() => handleClick("Exercises")} 
                        chosen={chosenLinks["Exercises"]} 
                        viewBox={"0 0 36 35"}
                        to="/exercises" 
                        name='Exercises' 
                        iconPath={exercisePath}/>
                    <NavbarLink onClick={() => handleClick("Food")} 
                        chosen={chosenLinks["Food"]} 
                        viewBox={"0 0 36 35"}
                        to="/food" 
                        name='Food' 
                        iconPath={foodPath}/>
                    <NavbarLink onClick={() => handleClick("Friends")} 
                        chosen={chosenLinks["Friends"]}
                        to="/friends" 
                        viewBox={"0 0 480 352"}
                        name='Friends' 
                        iconPath={friendsPath}/>
                </ul>
                <UserProfile />
            </div>
            <Outlet />
        </div>
    );
}

Navbar.propTypes = {}

export default Navbar
