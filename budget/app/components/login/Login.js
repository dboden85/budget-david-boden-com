import { useState } from "react";


const Login = (props)=>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

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

        fetch('http://localhost:5001/login', {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({user: user, pass: password})
        })
        .then( res => res.json())
        .then(data => {
            if(data.status){
                console.log(data.message);
                location.href = '/dashboard';
            }
        })
        .catch(error =>{
            console.log(error);
        })

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