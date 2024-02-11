import {useState} from 'react';

const Signup = (props) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');

    const onFnameChange = (e)=>{
        setFname(e.target.value);
    }

    const onLnameChange = (e)=>{
        setLname(e.target.value);
    }

    const onEmailChange = (e)=>{
        setEmail(e.target.value);
    }

    const onUnameChange = (e)=>{
	setUname(e.target.value);
    }

    const onPassChange = (e)=>{
	setPass(e.target.value);
    }

    const onClickHandler = ()=>{
        props.signUp(false);
    }
    
    const onSubmitHandler = (e)=>{
        e.preventDefault();

	console.log(`${fname}, ${lname}, ${email}, ${uname}, ${pass}`);

        fetch('http://192.168.0.121:5001/create-user', {
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
	    console.log(data['message']);
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
            <input onChange={onFnameChange} type="text" />
            <label>Last Name</label>
            <input onChange={onLnameChange} type="text" />
            <label>Email</label>
            <input onChange={onEmailChange} type="email" />
            <label>Username</label>
            <input onChange={onUnameChange} type="text" />
            <label>Password</label>
            <input onChange={onPassChange} type="password" />
            <button>Submit</button>
        </form>
        <p onClick={onClickHandler}>Back to Login</p>
        </div>
    )
}

export default Signup;
