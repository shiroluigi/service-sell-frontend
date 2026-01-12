import NavBar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"
import { useParams } from "react-router-dom"
import OrderDetailsComponent from "../components/OrderDetailsComponent.jsx";

const OrderDetails = () => {
    const {orderId} = useParams();
    return (
        <>
            <NavBar />
            <OrderDetailsComponent orderId = {orderId} />
            <Footer />
        </>
    )
}   

export default OrderDetails;