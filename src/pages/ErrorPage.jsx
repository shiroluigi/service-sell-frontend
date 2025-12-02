import { Link } from "react-router-dom";

const ErrorPage = (props) => {
    return (
        <>
            Not found
            <br></br>
            <Link to="/">Home</Link>
        </>
    );
}

export default ErrorPage;