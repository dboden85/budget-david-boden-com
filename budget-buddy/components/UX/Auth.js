import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation'

const Auth = ({children})=>{
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(()=>{
        const loggedIn = sessionStorage.getItem('isLoggedIn');

        if(!loggedIn){
		router.replace('/');
	}else{
		return children;
	}
    })
}

export default Auth;
