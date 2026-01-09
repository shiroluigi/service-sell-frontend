import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CheckoutForm from "../components/CheckoutForm";
import { useContext } from "react";
import { GlobalUserContext } from "../helper/Context";

const Checkout = () => {
    const {user,setUser} = useContext(GlobalUserContext);
    const {serviceId} = useParams();
    return (
        <>
            <NavBar />
                <CheckoutForm serviceId={serviceId} user={user}/>
            <Footer />
        </>
    )
}

export default Checkout;