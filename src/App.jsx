import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { loginUserAuth } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home/Home";
import Friends from "./routes/Friends/Friends";
import Exercises from "./routes/Exercises/Exercises";
import Notification from "./components/Notification/Notification";

function App() {
    const user = useSelector(({user}) => user);
    const dispatch = useDispatch();

    useEffect(() => {
        // if user was already logged in just set his 
        // user authentificator from local storage
        const userAuthString = window.localStorage.getItem("userAuth");
        if (userAuthString === null)
            return;
        const userAuth = JSON.parse(userAuthString); 
        dispatch(loginUserAuth(userAuth));
    }, [dispatch]);

    if (!user) {
        return <div className='bg-background w-svw h-svh'>
            <Notification />
            <LoginForm />
        </div> 
    }

    return (
        <div className='bg-background w-svw h-svh'>
            <Notification />
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/exercises" element={<Exercises />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
