"use client"; // This is a client component

import Image from "next/image";
import Login from '../components/login/Login';
import React, { useEffect, useState, useContext } from "react";
import Signup from "../components/login/Signup";
import Header from "../components/UI/Header";
import {UserContext} from "../components/contexts/user-context/UserContext";

export default function Home() {
  const [toSignUp, setToSignUp] = useState(false);
  const {userInfo} = useContext(UserContext);


  return (
    <>
     <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="style>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" r>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
      </head>
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
      <Header title="Budget" cls="login-header"/>
      <main>
          {!toSignUp && <Login signUp={setToSignUp}/>}
          {toSignUp && <Signup signUp={setToSignUp}/>}
      </main>
    </>
  );
}
