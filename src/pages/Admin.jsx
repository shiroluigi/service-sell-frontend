import { useContext } from "react";
import AdminComponent from "../components/AdminComponent";
import { GlobalUserContext } from "../helper/Context";
import NavBar from "../components/NavBar";

const Admin = () => {
    const { user } = useContext(GlobalUserContext);
    if (user && user.user.role == "ADMIN") {
        return (
            <>
                <NavBar />
                <AdminComponent />
            </>
        )
    } else {
        window.location.reload("/");
    }
}

export default Admin;