import { loginUser} from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

function LoginForm() {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState({'username': '', 'pwd': ''});
    
    function handleLogin(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const pwd = e.target.pwd.value;
        dispatch(loginUser(username, pwd));
    }

    function handleInputChange(e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setFormFields({...formFields, [inputName]: inputValue});
    }

    const btnEnabled = Object.values(formFields).every(value => value.trim() !== '');
    
    return (
        <div className='flex items-center justify-center w-full h-svh bg-background'>
            <div className='rounded-lg shadow-xl p-10 bg-white gap-3'>
                <h2 className='text-center text-lg font-bold'>Login to Gym App</h2>
                <form action="" onSubmit={handleLogin} className='flex items-center gap-3 justify-center flex-col'>
                    <Input name='username' label='Username' changeHandler={handleInputChange}/>
                    <Input name='pwd' label='Password' changeHandler={handleInputChange}/>
                    <Button name='Login' type='submit' enabled={btnEnabled}/>
                </form>
            </div>
        </div>
    )
}

LoginForm.propTypes = {}

export default LoginForm
