'use client'
import { createContext, useState } from 'react'
 
export const UserContext = createContext({});

const UserProvider = ({children})=>{
  const [userInfo, setUserInfo] = useState({name: 'David'});
  return <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
}

export default UserProvider;
