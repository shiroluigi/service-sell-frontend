import { useContext, useState } from "react";
import "../assets/LoginForm.css";
import { GlobalUserContext } from "../helper/Context";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const LoginForm = () => {
    const { user, setUser } = useContext(GlobalUserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginAction = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${SERVER_URL}/user/login`,
                {
                    email,
                    password
                }
            );
            if (response.data.errMsg){
                console.error("Login failed: ",response.data.errMsg);
            }else{
                setUser(response.data);
                window.location.reload();
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    return (
        <form className="loginForm" action="POST" onSubmit={loginAction}>
            <h1>Login</h1>

            <label htmlFor="email">Enter Email:</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Enter Password:</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Go</button>
        </form>
    );
};

export default LoginForm;
