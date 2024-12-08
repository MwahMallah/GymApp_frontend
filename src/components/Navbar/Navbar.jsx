import { Outlet } from 'react-router-dom'
import Logo from "../Logo/Logo"
import NavbarLink from '../NavbarLink/NavbarLink';

import foodPath from '../../assets/food.jsx';
import exercisePath from '../../assets/exercises.jsx';
import friendsPath from '../../assets/friends.jsx';
import logoPath from '../../assets/logo.jsx';

function Navbar() {
    return (
        <div className='bg-background w-svw h-svh'>
            <div className='flex flex-row justify-between mx-4 py-5 align-center'>
                <Logo />
                <ul className='card flex flex-row gap-10'>
                    <NavbarLink to="/" name='Home' iconPath={logoPath} stroke="#1E1E1E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <NavbarLink to="/exercises" name='Exercises' iconPath={exercisePath}/>
                    <NavbarLink to="/food" name='Food' iconPath={foodPath}/>
                    <NavbarLink to="/friends" name='Friends' iconPath={friendsPath}/>
                </ul>
                <Logo />
            </div>
            <Outlet />
        </div>
    );
}

Navbar.propTypes = {}

export default Navbar
