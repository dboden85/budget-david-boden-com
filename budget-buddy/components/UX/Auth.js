import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';

const Auth = ({children})=>{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const path = usePathname();

    useEffect(()=>{
        const loggedIn = sessionStorage.getItem('isLoggedIn');
        

        const isLoginPage = path === '/';

        console.log(isLoginPage)

        if(!loggedIn && !isLoginPage){
		    router.replace('/');
        }else if(loggedIn && isLoginPage){
            router.replace('/dashboard');
        }
    }, [isLoggedIn])

    if(isLoggedIn){
        return children;
    }
}

export default Auth;
