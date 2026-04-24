import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CheckoutForm from "../components/CheckoutForm";
import userStore from "../helper/store";

const Checkout = () => {
    const user  = userStore.getState();
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