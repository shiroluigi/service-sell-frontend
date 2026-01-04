import "../assets/LoginModal.css"
import { useState } from "react";
import LoginForm from "./LoginForm.jsx"
import RegisterForm from "./RegisterForm.jsx";

const LoginModal = ({ onClose }) => {
    const [loginFormActive,setLoginFormActive] = useState(true);
    const [registerFormActive,setRegisterFormActive] = useState(false);

    const toggleLoginRegister = () => {
      if (loginFormActive){
        setLoginFormActive(false)
        setRegisterFormActive(true)
      }else{
        setLoginFormActive(true)
        setRegisterFormActive(false)
      }
    }

    return (
    <>
      <div className="overlay" onClick={onClose}></div>

      <div className="modal">
        {loginFormActive && <><LoginForm></LoginForm> <span>New User? <button onClick={toggleLoginRegister} className="formSwitchButton"> Register Here</button></span></>}
        {registerFormActive && <><RegisterForm></RegisterForm> <span>Already have an account? <button onClick={toggleLoginRegister} className="formSwitchButton"> Login Here</button></span></>}
        <br />
        <br />
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </>
  );
}

export default LoginModal;

