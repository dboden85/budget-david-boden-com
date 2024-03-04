"use client"; // This is a client component
import { useState } from "react";
import {useRouter} from "next/navigation";


const Header = (props)=>{
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

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

    return(
        <header className={`header ${props.cls}`}>
            <h1>{props.title}</h1>
            <img onClick={onMenuOpen} className="menu-icon" src="../../menu.svg"/>
            {menuOpen && (
                <nav className="site-nav">
                    <h2>Menu</h2>
                    <img onClick={onMenuClose} className="close-menu-icon" src="../../close-menu.svg"/>
                    <ul className="nav-menu">
                        <li className="nav-item"><a href="/dashboard">Dashboard</a></li>
                        <li className="nav-item"><a href="/paycheck">Paycheck</a></li>
                        <li className="nav-item"><a href="/bills">Bills</a></li>
                        <li className="nav-item"><a href="/savings">Savings</a></li>
                        <li className="nav-item"><a onClick={logoutHandler}>Logout</a></li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header;