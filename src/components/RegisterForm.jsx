import "../assets/RegisterForm.css"

const RegisterForm = () => {
    return (
        <form className="registerForm" method="POST">
            <h1>Register</h1>
            <input type="hidden" name="formType" value={"register"} />
            <label htmlFor="firstName">Enter First Name: </label>
            <input type="text" name="firstName"></input>
            <label htmlFor="lastName">Enter Last Name: </label>
            <input type="text" name="lastName"></input>
            <label htmlFor="email">Enter Email: </label>
            <input type="text" name="email"></input>
            <label htmlFor="email">Enter Password:</label>
            <input type="password" name="password"></input>
            <button type="submit">Go</button>
        </form>
    )
}

export default RegisterForm;