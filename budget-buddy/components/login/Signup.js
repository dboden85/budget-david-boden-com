import {useState, useRef} from 'react';

const Signup = (props) => {
    let fname = useRef('');
    let lname = useRef('');
    let email = useRef('');
    let uname = useRef('');
    let pass = useRef('');

    

    const onClickHandler = ()=>{
        props.signUp(false);
    }
    
    const onSubmitHandler = (e)=>{
        e.preventDefault();

        fname = fname.current.value;
        lname = lname.current.value;
        email = email.current.value;
        uname = uname.current.value;
        pass = pass.current.value;

        console.log(`${fname}\n${lname}\n${email}\n${uname}\n${pass}`)


        fetch('/api/adduser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        uname: uname,
        pass: pass
        })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(err => {
            console.error(err);
        })
    };
    
    return (

        <div className="login-form-container">
        <form className="loginForm" onSubmit={onSubmitHandler}>
            <h2>Signup</h2>
            <label>First Name</label>
            <input ref={fname} type="text" />
            <label>Last Name</label>
            <input ref={lname} type="text" />
            <label>Email</label>
            <input ref={email} type="email" />
            <label>Username</label>
            <input ref={uname} type="text" />
            <label>Password</label>
            <input ref={pass} type="password" />
            <button>Submit</button>
        </form>
        <p onClick={onClickHandler}>Back to Login</p>
        </div>
    )
}

export default Signup;
