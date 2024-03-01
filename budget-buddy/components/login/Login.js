import { useState, useContext, useRef } from "react";
import { useRouter } from 'next/navigation'


const Login = (props)=>{
    const router = useRouter()
    const user = useRef('');
    const password = useRef('');


    const onClickHandler = ()=>{
        props.signUp(true);
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        if(!user || !password){
            console.log('fields cant be empty');
            return;
        }

        fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            uname: user.current.value,
            pass: password.current.value
        })
        })
        .then(res =>{
            return res.json();
        })
        .then(data => {
            if(data.results){
            console.log(data.uid)
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('userInfo', JSON.stringify(data.results));
            }
            router.push('/dashboard');
        })
        .catch(err => {
            console.log(err + '\nFetch had an error');
        })

    }

    return(
        <div className="login-form-container">
            <form className="loginForm" onSubmit={onSubmitHandler}>
                <h2>Login</h2>
                <label>Username</label>
                <input ref={user} type="text"  />
                <label>Password</label>
                <input ref={password} type="password"  />
                <button>Submit</button>
            </form>
            <p onClick={onClickHandler}>Need to Sign Up?</p>
        </div>
    )
}

export default Login;
