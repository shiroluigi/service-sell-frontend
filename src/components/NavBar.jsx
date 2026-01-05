import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../components/LoginModal.jsx";
import '../assets/NavBar.css';
import { GlobalUserContext } from "../helper/Context.jsx";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const linksStyle = ({ isActive, isPending }) => {
    return ({
        textDecoration: isActive ? "underline" : "none",
        color: "black"
    })
};

const NavBar = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(GlobalUserContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="outer">
                <ul className="nav-items">
                    <li><NavLink style={linksStyle} to={"/"}>Home</NavLink></li>
                    <li><NavLink style={linksStyle} to={"/about"}>About</NavLink></li>
                    <li><NavLink style={linksStyle} to={"/services"}>Services</NavLink></li>
                </ul>

                {
                    !user &&
                    <div className="right-item">
                        <button className='button' onClick={() => setShowModal(true)}>
                            Login
                        </button>
                    </div>
                }
                {
                    user
                    &&
                    <div className="right-item">
                        <div>
                            <FaUserCircle
                                onClick={
                                    () => {
                                        navigate("/profile")
                                    }
                                }
                                className="profile-icon" />
                        </div>
                        <button className='button' onClick={() => { setUser(null) }}>
                            Logout
                        </button>
                    </div>
                }
            </div>

            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default NavBar;
