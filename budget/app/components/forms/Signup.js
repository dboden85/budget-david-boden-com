const Signup = (props) => {

    const onClickHandler = ()=>{
        props.signUp(false);
    }
    
    return (

        <div className="login-form-container">
        <form className="loginForm">
            <h2>Signup</h2>
            <label>First Name</label>
            <input type="text" />
            <label>Last Name</label>
            <input type="text" />
            <label>Email</label>
            <input type="email" />
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <button>Submit</button>
        </form>
        <p onClick={onClickHandler}>Back to Login</p>
        </div>
    )
}

export default Signup;