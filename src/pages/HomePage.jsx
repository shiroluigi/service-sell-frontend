import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/HomePage.css"

const HomePage = () => {
    return(
        <>
            <NavBar></NavBar>
            <div className="heading">
                <span>Welcome!</span>
            </div>
            <div className="subtext">
                <span>Nice to have you here!</span>
            </div>
            <hr></hr>
            <Footer />
        </>
    );
}

export default HomePage;