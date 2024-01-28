

const Login = (props)=>{

    const onClickHandler = ()=>{
        props.signUp(true);
    }

    return(
        <div className="login-form-container">
            <form className="loginForm">
                <h2>Login</h2>
                <label>Username</label>
                <input type="text"  />
                <label>Password</label>
                <input type="password"  />
                <button>Submit</button>
            </form>
            <p onClick={onClickHandler}>Need to Sign Up?</p>
        </div>
    )
}

export default Login;