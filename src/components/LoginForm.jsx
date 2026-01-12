import { useContext, useEffect, useState } from "react";
import "../assets/LoginForm.css";
import { GlobalUserContext } from "../helper/Context";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const LoginForm = () => {
    const { setUser } = useContext(GlobalUserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [toggleSpinner, setToggleSpinner] = useState(false);

    const loginAction = async (e) => {
        e.preventDefault();
        setToggleSpinner(true);

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
            setToggleSpinner(false);
            window.location.reload();
        } catch (error) {
            // console.error("Login failed:", error.response || error.message);
            if (error.response.status == "404") {
                setToggleSpinner(false);
                setErrMsg("User not found.");
            }
        }
    };

    useEffect(() => setErrMsg(""), [email,password]);

    return (
        <form className="loginForm" action="POST" onSubmit={loginAction}>
            <h1>Login</h1>

            <label htmlFor="email">Enter Email:</label>
            <input
                className="inputFields"
                type="text"
                name="email"
                maxLength="50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Enter Password:</label>
            <input
                className="inputFields"
                type="password"
                name="password"
                maxLength="50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {!toggleSpinner ?
                <button
                    type="submit"
                    className="submitButton">
                    Go
                </button>
                :
                <div className="spinner">
                    <TailSpin
                        visible={true}
                        height="40"
                        width="40"
                        className = "spinner"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }
            <span className="errorMessage">{errMsg}</span>
        </form>
    );
};

export default LoginForm;
