import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/HomePage.css"
import MyProjects from "../components/MyProjects.jsx";
import userStore from "../helper/store.js";

const HomePage = () => {
    const user = userStore.getState();
    return(
        <>
            <NavBar></NavBar>
            <div className="heading">
                <span>Welcome {user == null ? "" : user.firstName}!</span>
            </div>
            <div className="subtext">
                <span>Nice to have you here!</span>
            </div>
            <div>
                <MyProjects />
            </div>
            <Footer />
        </>
    );
}

export default HomePage;