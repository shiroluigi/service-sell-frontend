import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/HomePage.css"
import MyProjects from "../components/MyProjects.jsx";

const HomePage = ({name}) => {
    return(
        <>
            <NavBar></NavBar>
            <div className="heading">
                <span>Welcome {name}!</span>
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