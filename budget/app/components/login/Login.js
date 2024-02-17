import { useState, useContext } from "react";
import UserContext from "../contexts/user-context/user-context";


const Login = (props)=>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const userCtx = useContext(UserContext);

    const { loginHandler } = userCtx;

    const onUserChange = (e)=>{
        setUser(e.target.value)
    }

    const onPassChange = (e)=>{
        setPassword(e.target.value);
    }

    const onClickHandler = ()=>{
        props.signUp(true);
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        if(!user || !password){
            console.log('fields cant be empty');
            return;
        }

        loginHandler(user, password);

    }

    return(
        <div className="login-form-container">
            <form className="loginForm" onSubmit={onSubmitHandler}>
                <h2>Login</h2>
                <label>Username</label>
                <input onChange={onUserChange} type="text"  />
                <label>Password</label>
                <input onChange={onPassChange} type="password"  />
                <button>Submit</button>
            </form>
            <p onClick={onClickHandler}>Need to Sign Up?</p>
        </div>
    )
}

export default Login;
