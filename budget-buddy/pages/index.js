"use client"; // This is a client component

import Image from "next/image";
import Login from '../components/login/Login';
import React, { useEffect, useState, useContext } from "react";
import Signup from "../components/login/Signup";
import Header from "../components/UI/Header";
import Auth from '../components/UX/Auth'

function Home() {
  const [toSignUp, setToSignUp] = useState(false);


  return (
    <>
      <Header title="Budget" cls="login-header"/>
      <main>
          {!toSignUp ? <Login signUp={setToSignUp} /> : <Signup signUp={setToSignUp}/>}
      </main>
    </>
  );
}

export default ()=>(
	<Auth>
		<Home/>
	</Auth>
);
