"use client"; // This is a client component

import Image from "next/image";
import Login from './components/login/Login';
import React, { useEffect, useState } from "react";
import Signup from "./components/login/Signup";
import Header from "./components/UI/Header";
import UserProvider from "./components/contexts/user-context/UserProvider";

export default function Home() {
  const [toSignUp, setToSignUp] = useState(false);

  return (
    <UserProvider>
      <Header title="Budget" cls="login-header"/>
      <main>
        {!toSignUp && <Login signUp={setToSignUp}/>}
        {toSignUp && <Signup signUp={setToSignUp}/>}
      </main>
    </UserProvider>
  );
}
