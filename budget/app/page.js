"use client"; // This is a client component

import Image from "next/image";
import Login from './components/login/Login';
import React, { useEffect, useState } from "react";
import Signup from "./components/login/Signup";
import Header from "./components/UI/Header";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toSignUp, setToSignUp] = useState(false);

  useEffect(()=>{
    if(isLoggedIn){
      location.href = '/dashboard';
    }
  }, [])

  return (
    <>
      <Header title="Budget" cls="login-header"/>
      <main>
        {!toSignUp && <Login signUp={setToSignUp}/>}
        {toSignUp && <Signup signUp={setToSignUp}/>}
      </main>
    </>
  );
}
