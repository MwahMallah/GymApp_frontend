import { loginUser} from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

function LoginForm() {
    const dispatch = useDispatch();
    function handleLogin(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const pwd = e.target.pwd.value;
        dispatch(loginUser(username, pwd));
    }

    return (
        <div>
            <h2>Login to Gym App</h2>
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
                <br />
                <label htmlFor="pwd">Password</label>
                <input type="text" name="pwd" id="pwd"/>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {}

export default LoginForm
