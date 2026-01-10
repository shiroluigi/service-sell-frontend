import { useState } from "react"
import "../assets/RegisterForm.css"
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const registerAction = async (e) => {
        e.preventDefault();
        try {
            const request = {
                firstName,
                lastName,
                email,
                password
            }
            const response = await axios.post(
                `${SERVER_URL}/user/register`,
                request
            )
            setErrMsg("Registration successful. Please Login.");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Exception occured! ", error.response)
            setErrMsg(error.response.data.errMsg);
        }
    }

    return (
        <form className="registerForm" method="POST" onSubmit={registerAction}>
            <h1>Register</h1>
            <label htmlFor="firstName">Enter First Name: </label>
            <input
                className="inputFields"
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Enter Last Name: </label>
            <input
                className="inputFields"
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Enter Email: </label>
            <input
                className="inputFields"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Enter Password:</label>
            <input
                className="inputFields"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="submitButton"
                type="submit">
                Go
            </button>
            <span className="errorMessage">{errMsg}</span>
        </form>
    )
}

export default RegisterForm;