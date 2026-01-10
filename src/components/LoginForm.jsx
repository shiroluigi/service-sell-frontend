import { useContext, useState } from "react";
import "../assets/LoginForm.css";
import { GlobalUserContext } from "../helper/Context";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const LoginForm = () => {
    const { user, setUser } = useContext(GlobalUserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg,setErrMsg] = useState("");

    const loginAction = async (e) => {
        e.preventDefault();

        try {
            setEmail(email.trim());
            setPassword(password.trim());
            const response = await axios.post(
                `${SERVER_URL}/user/login`,
                {
                    email,
                    password
                }
            );
            setUser(response.data);
            window.location.reload();
        } catch (error) {
            console.error("Login failed:", error.response || error.message);
            if (error.response.status == "404"){
                setErrMsg("User not found.");
            }
        }
    };

    return (
        <form className="loginForm" action="POST" onSubmit={loginAction}>
            <h1>Login</h1>

            <label htmlFor="email">Enter Email:</label>
            <input
                className="inputFields"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Enter Password:</label>
            <input 
                className="inputFields"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                type="submit"
                className="submitButton">
                    Go
                </button>
            <span className="errorMessage">{errMsg}</span>
        </form>
    );
};

export default LoginForm;
