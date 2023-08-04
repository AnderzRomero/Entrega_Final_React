import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink, Link } from 'react-router-dom'

const NavBar = () => {
    const imgLogo = "/img/HeroSystems.png"
    return (
        <header className="navbar navbar-expand-lg bg-NavBar">
            <div className="container-fluid">
                <Link to={"/"}>
                    <img className="imgLogo" src={imgLogo} alt="HeroSystems" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <nav className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink activeClassName="active" to={`/categoria/3`}>Boards</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" to={`/categoria/2`}>Portatiles Gamers</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink activeClassName="active" to={`/categoria/4`}>Perifericos</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink activeClassName="active" to={`/categoria/1`}>Cajas</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink activeClassName="active" to={`/categoria/5`}>Monitores</NavLink>
                        </li>
                    </ul>
                </nav>
                <CartWidget />
            </div>
        </header>        
    )
}

export default NavBar