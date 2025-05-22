import { Link } from "react-router-dom";
import './Navbar.css';
import starWarsIcon from '../assets/starwars.svg'

function NavBar () {
    return ( 
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                <h1>Star Wars May the forth</h1>
                </Link>
                <img src={starWarsIcon} alt="Star Wars Icon" className="navbar-icon" />
            </div>
        </nav>
     );
}

export default NavBar ;