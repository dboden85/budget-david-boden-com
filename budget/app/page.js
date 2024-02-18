"use client"; // This is a client component

import Image from "next/image";
import Login from './components/login/Login';
import React, { useEffect, useState } from "react";
import Signup from "./components/login/Signup";
import Header from "./components/UI/Header";
import UserContext from "./components/contexts/user-context/UserContext";

export default function Home() {
  const [toSignUp, setToSignUp] = useState(false);
  const [userInfo, setUserInfo] = useState();

  return (
    <>
      <Header title="Budget" cls="login-header"/>
      <main>
        <UserContext.Provider value={{userInfo, setUserInfo}}>
          {!toSignUp && <Login signUp={setToSignUp}/>}
          {toSignUp && <Signup signUp={setToSignUp}/>}
        </UserContext.Provider>
      </main>
    </>
  );
}
