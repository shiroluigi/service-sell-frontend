import { useEffect, useState } from "react"
import "../assets/RegisterForm.css"
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const RegisterForm = () => {

    const [toggleSpinner, setToggleSpinner] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const registerAction = async (e) => {
        e.preventDefault();
        if (password.trim() !== retypePassword.trim()) {
            setErrMsg("Passwords don't match.");
            return;
        }
        setToggleSpinner(true);
        try {
            const request = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: password.trim()
            }
            const response = await axios.post(
                `${SERVER_URL}/public/register`,
                request
            )
            // console.log(response)
            setErrMsg("Registration successful. Please Login.");
            setToggleSpinner(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (!(error.response.status == "403"))
                setToggleSpinner(false);
            // console.error("Exception occured! ", error.response)
            setErrMsg(error?.response?.data?.errMsg);
        }
    }
    useEffect(() => setErrMsg(""),[firstName,lastName,email,password,retypePassword]);

    return (
        <form className="registerForm" method="POST" onSubmit={registerAction}>
            <h1>Register</h1>
            <label htmlFor="firstName">Enter First Name: </label>
            <input
                className="inputFields"
                type="text"
                name="firstName"
                maxLength="50"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <label htmlFor="lastName">Enter Last Name: </label>
            <input
                className="inputFields"
                type="text"
                name="lastName"
                maxLength="50"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <label htmlFor="email">Enter Email: </label>
            <input
                className="inputFields"
                type="text"
                name="email"
                maxLength="50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Enter Password:</label>
            <input
                className="inputFields"
                type="password"
                name="password"
                maxLength="50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <label htmlFor="retype">Retype Password:</label>
            <input
                className="inputFields"
                type="password"
                name="retype"
                maxLength="50"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                required
            />
            {!toggleSpinner ?
                <button
                    type="submit"
                    className="submitButton">
                    Go
                </button>
                :
                <div className="spinner-register-form">
                    <TailSpin
                        visible={true}
                        height="40"
                        width="40"
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
    )
}

export default RegisterForm;