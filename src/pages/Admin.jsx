import { useContext } from "react";
import AdminComponent from "../components/AdminComponent";
import { GlobalUserContext } from "../helper/Context";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate()
    const { user } = useContext(GlobalUserContext);
    if (user && user.user.role == "ADMIN") {
        return (
            <>
                <NavBar />
                <AdminComponent />
            </>
        )
    } else {
        navigate("/", { replace: true })
    }
}

export default Admin;