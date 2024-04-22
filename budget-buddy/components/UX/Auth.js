import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

const Auth = ({children})=>{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const loggedIn = sessionStorage.getItem('isLoggedIn');

        if(!loggedIn){
		    router.replace('/');
        }else{
            setIsLoggedIn(true);
        }
    })

    if(isLoggedIn){
        return children;
    }
}

export default Auth;
