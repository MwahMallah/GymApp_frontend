import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import {  useEffect, useState } from "react";
import { loginUserAuth } from "./reducers/userReducer";
import { SpinnerCircular } from 'spinners-react';

import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home/Home";
import Friends from "./routes/Friends/Friends";
import Exercises from "./routes/Exercises/Exercises";
import Notification from "./components/Notification/Notification";
import Food from "./routes/Food/Food";
import Settings from "./routes/Settings/Settings";

function App() {
    const user = useSelector(({user}) => user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    async function getUserFromLocalStorage() {
        setIsLoading(true);
        if (!user) {
            const userAuthString = window.localStorage.getItem("userAuth");
            if (userAuthString !== null) {
                const userAuth = JSON.parse(userAuthString); 
                await dispatch(loginUserAuth(userAuth)).unwrap();
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } 
    }

    useEffect(() => {
        getUserFromLocalStorage();
    }, [dispatch]);

    if (isLoading) {
        return <div className='bg-background w-screen h-screen flex items-center justify-center'>
            <SpinnerCircular/>
        </div> 
    }

    if (user === null) {
        return <div className='bg-background w-svw h-svh'>
            <Notification />
            <LoginForm />
        </div> 
    }

    return (
        <div className='bg-background w-screen h-screen flex flex-col'>
            <Notification />
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/food" element={<Food />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
