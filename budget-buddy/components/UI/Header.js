"use client"; // This is a client component
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import Link from 'next/link';
import Image from "next/image";


const Header = (props)=>{
    const [menuOpen, setMenuOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const router = useRouter();

    useEffect(()=>{
      const oData = sessionStorage.getItem('isLoggedIn');

      if(oData){
        setIsOnline(oData);
      }
    }, [])

    const onMenuOpen = ()=>{
        setMenuOpen(true);
    }

    const onMenuClose = ()=>{
        setMenuOpen(false);
    }

    const logoutHandler = ()=>{
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('bills');
        sessionStorage.removeItem('paycheckItems');
        router.push('/');
    }

    const openMenuClass = menuOpen ? 'site-nav open' : 'site-nav';

    return(
        <header className={`header ${props.cls}`}>
            <h1>{props.title}</h1>
            {isOnline && <Image width="35" height="35" onClick={onMenuOpen} className="menu-icon" src="../../menu.svg"/>}
            <nav className={openMenuClass}>
                <h2>Menu</h2>
                <Image width="35" height="35" onClick={onMenuClose} className="close-menu-icon" src="../../close-menu.svg"/>
                <ul className="nav-menu">
                    <li className="nav-item"><Link href="/dashboard">Dashboard</Link></li>
                    <li className="nav-item"><Link href="/paycheck">Paycheck</Link></li>
                    <li className="nav-item"><Link href="/bills">Bills</Link></li>
                    <li className="nav-item"><Link href="/savings">Savings</Link></li>
                    <li className="nav-item"><Link href="#" onClick={logoutHandler}>Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
