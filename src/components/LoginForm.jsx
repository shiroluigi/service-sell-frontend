import "../assets/LoginForm.css"

const LoginForm = () => {
    return (
        <form className="loginForm" method="POST">
            <h1>Login</h1>
            <input type="hidden" name="formType" value={"login"} />
            <label htmlFor="email">Enter Email: </label>
            <input type="text" name="email"></input>
            <label htmlFor="email">Enter Password:</label>
            <input type="password" name="password"></input>
            <button type="submit">Go</button>
        </form>
    )
}

export default LoginForm;