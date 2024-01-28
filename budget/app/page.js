"use client"; // This is a client component

import Image from "next/image";
import './style.scss';
import Login from './components/login/Login';
import React, { useState } from "react";
import Signup from "./components/login/Signup";

export default function Home() {
  const [toSignUp, setToSignUp] = useState(false);
  return (
    <main>
      {!toSignUp && <Login signUp={setToSignUp}/>}
      {toSignUp && <Signup signUp={setToSignUp}/>}
    </main>
  );
}
