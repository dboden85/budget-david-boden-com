

const Header = (props)=>{
    return(
        <header className={`header ${props.cls}`}>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;