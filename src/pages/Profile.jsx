import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfileComponent from "../components/ProfileComponent";
import { useContext } from "react";
import { GlobalUserContext } from "../helper/Context";

const Profile = () => {
    return(
        <>
            <NavBar />
            <ProfileComponent/>
            <Footer />
        </>
    );
}

export default Profile;