import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../components/LoginModal.jsx";
import '../assets/NavBar.css';

const linksStyle = ({isActive,isPending}) => {
    return ({
        textDecoration : isActive ? "underline" : "none",
        color: "black"
    })
};

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="outer">
                <ul className="nav-items">
                    <li><NavLink style={linksStyle} to={"/"}>Home</NavLink></li>
                    <li><NavLink style={linksStyle} to={"/about"}>About</NavLink></li>
                    <li><NavLink style={linksStyle} to={"/services"}>Services</NavLink></li>
                </ul>

                <div className="right-item">
                    <button className='button' onClick={() => setShowModal(true)}>
                        Login
                    </button>
                </div>
            </div>

            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default NavBar;
