import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm/LoginForm";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home/Home";
import { useEffect } from "react";
import { setUser } from "./reducers/userReducer";
import Friends from "./routes/Friends/Friends";
import Exercises from "./routes/Exercises/Exercises";

function App() {
    const user = useSelector(({user}) => user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const user = JSON.parse(window.localStorage.getItem("user"));
    //     dispatch(setUser(user));
    // }, [dispatch]);

    if (!user) {
        return <LoginForm />;
    }

    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/exercises" element={<Exercises />} />
            </Route>
        </Routes>
    )
}

export default App
