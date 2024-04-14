import { useState, useContext, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Loading from '../UI/Loading';


const Login = (props)=>{
    const router = useRouter()
    const user = useRef('');
    const password = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const [isErr, setIsErr] = useState(false);
    const [errMessage, setErrMessage] = useState('Nothing to see here.  Move along!');


    const onClickHandler = ()=>{
        props.signUp(true);
    }

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        if(!user || !password){
            console.log('fields cant be empty');
            return;
        }
        setIsErr(false);
        setIsLoading(true);

        try{

            //Send credentials to server and compare.
            fetch('/api/getuser', {
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
                        console.log(data.results)
                        router.push('/dashboard');
                    }else{
                        throw(data.message)
                    }
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                    setIsErr(true);
                    setErrMessage(err)
                })
        }
        catch(err){
            setIsLoading(false);
            setIsErr(true);
            setErrMessage('Can\'t connect to the server!')
        }

        

    }




    return(
        <div className="login-form-container">
            <form className="loginForm" onSubmit={onSubmitHandler}>
                <h2>Login</h2>
                <label>Username</label>
                <input ref={user} type="text" defaultValue="example"/>
                <label>Password</label>
                <input ref={password} type="password" defaultValue="example"/>
                <button>Submit</button>

                {isLoading && (
                    <div className='loader-container'>
                        {isLoading && <Loading/>}
                    </div>
                    )
                }

                {isErr && (
                    <div className='formErr'>
                        {isErr && <p>{errMessage}</p>}
                    </div>
                )}
            </form>
            
            <p onClick={onClickHandler}>Need to Sign Up?</p>
        </div>
    )
}

export default Login;
