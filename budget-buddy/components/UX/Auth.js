import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';

const Auth = ({children})=>{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const path = usePathname();

    useEffect(()=>{
        const loggedIn = sessionStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn);
        

        const isLoginPage = path === '/';

        if(!loggedIn && !isLoginPage){
		    router.replace('/');
        }else if(loggedIn && isLoginPage){
            router.replace('/dashboard');
        }
    })

    return children;
}

export default Auth;
