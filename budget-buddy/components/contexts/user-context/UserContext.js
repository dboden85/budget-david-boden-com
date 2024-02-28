'use client'
import { createContext, useState } from 'react'
 
export const UserContext = createContext({});

export const UserProvider = ({children})=>{
  const [userInfo, setUserInfo] = useState({paycheck_amount: 200.00});
  return <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
}
