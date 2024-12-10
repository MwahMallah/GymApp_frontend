import { Outlet } from 'react-router-dom'
import Logo from "../Logo/Logo"
import NavbarLink from '../NavbarLink/NavbarLink';

import foodPath from '../../assets/food.jsx';
import exercisePath from '../../assets/exercises.jsx';
import friendsPath from '../../assets/friends.jsx';
import homePath from '../../assets/home.jsx'; 

import { useState, useEffect } from 'react';
import UserProfile from '../UserProfile/UserProfile.jsx';
import settingsPath from '../../assets/settings.jsx';

function Navbar() {
    const [chosenLinks, setChosenLinks] = useState({
        '/': false, 
        '/exercises': false, 
        '/food': false, 
        '/friends': false,
        '/settings': false
    });

    useEffect(() => {   
        setChosenLinks({...chosenLinks, [location.pathname] : true});
    }, []);    

    function handleClick(name) {
        setChosenLinks({
            '/': false, 
            '/exercises': false, 
            '/food': false, 
            '/friends': false,
            '/settings': false,
            [name]: true, 
        });
    }

    return (
        <>
            <div className='flex flex-row justify-between mx-8 py-5 items-center'>
                <Logo />
                <ul className='card flex flex-row gap-10 px-10'>
                    <NavbarLink onClick={() => handleClick("/")} 
                        chosen={chosenLinks["/"]} 
                        viewBox={"0 0 512 448"}
                        to="/" 
                        name='Home' 
                        iconPath={homePath}/>
                    <NavbarLink onClick={() => handleClick("/exercises")} 
                        chosen={chosenLinks["/exercises"]} 
                        viewBox={"0 0 36 35"}
                        to="/exercises" 
                        name='Exercises' 
                        iconPath={exercisePath}/>
                    <NavbarLink onClick={() => handleClick("/food")} 
                        chosen={chosenLinks["/food"]} 
                        viewBox={"0 0 36 35"}
                        to="/food" 
                        name='Food' 
                        iconPath={foodPath}/>
                    <NavbarLink onClick={() => handleClick("/friends")} 
                        chosen={chosenLinks["/friends"]}
                        to="/friends" 
                        viewBox={"0 0 480 352"}
                        name='Friends' 
                        iconPath={friendsPath}/>
                    <NavbarLink onClick={() => handleClick("/settings")} 
                        chosen={chosenLinks["/settings"]}
                        to="/settings" 
                        viewBox={"0 0 36 37"}
                        name='Settings' 
                        iconPath={settingsPath}/>
                </ul>
                <UserProfile />
            </div>
            <Outlet />
        </>
    );
}

Navbar.propTypes = {}

export default Navbar
