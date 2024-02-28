import { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation'
import {UserContext} from "../contexts/user-context/UserContext";


const Login = (props)=>{
    const router = useRouter()
    const [user, setUser] = useState()
    const {userInfo, setUserInfo} = useContext(UserContext);
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

        fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            uname: user,
            pass: password
        })
        })
        .then(res =>{
            return res.json();
        })
        .then(data => {
            console.log('fetch ran 1')
            if(data.results[0]){
            //   setUserInfo({
            //     ...data.results[0]
            //   })
            //   router.push('/dashboard');
            console.log(data.results[0]);
            }
        })
        .catch(err => {
            console.log(err + '\nFetch had an error');
        })

        // setUserInfo({uname: user, pass: password});

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
