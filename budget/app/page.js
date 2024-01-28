"use client"; // This is a client component

import Image from "next/image";
import './style.scss';
import Login from './components/login/Login';
import React, { useState } from "react";
import Signup from "./components/login/Signup";
import Header from "./components/UI/Header";

export default function Home() {
  const [toSignUp, setToSignUp] = useState(false);
  return (
    <>
      <Header title="Budget Planner"/>
      <main>
        {!toSignUp && <Login signUp={setToSignUp}/>}
        {toSignUp && <Signup signUp={setToSignUp}/>}
      </main>
    </>
  );
}
