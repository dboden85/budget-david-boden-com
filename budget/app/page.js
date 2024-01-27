"use client"; // This is a client component

import Image from "next/image";
import './style.scss';
import Login from './components/forms/Login';
import React, { useState } from "react";
import Signup from "./components/forms/Signup";

export default function Home() {
  const [toSignUp, setToSignUp] = useState(false);
  return (
    <main>
      {!toSignUp && <Login signUp={setToSignUp}/>}
      {toSignUp && <Signup signUp={setToSignUp}/>}
    </main>
  );
}
