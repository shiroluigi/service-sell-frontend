import '../assets/NavBar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="outer">
            <ul className="nav-items">
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/about"}>About</NavLink></li>
                <li><NavLink to={"/services"}>Services</NavLink></li>
            </ul>

            <div className="right-item">
                <button className='button'>Login</button>
            </div>
        </div>
    );
};

export default NavBar;
