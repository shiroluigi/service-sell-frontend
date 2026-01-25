import { useContext, useEffect, useState } from "react";
import "../assets/OrderDetailsComponent.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { GlobalUserContext } from "../helper/Context";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const OrderDetailsComponent = ({ orderId }) => {
    const {user} = useContext(GlobalUserContext)
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserOrders = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/order/${orderId.trim()}`,
            {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "ngrok-skip-browser-warning": "true"
                }
            }
        );
            setOrder(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserOrders();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading)
        return (
            <div className="loader-center">
                <TailSpin height="60" width="60" color="orange" />
            </div>
        );

    if (!order) return <p>No order found</p>;

    const formattedDate = new Date(order.timestamp).toLocaleString();

    return (
        <div className="receipt-wrapper">
            <div className="receipt-container">
                <h2 className="receipt-title">Order Receipt</h2>

                <div className="receipt-section">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {formattedDate}</p>
                </div>

                <div className="receipt-section">
                    <p><strong>Service:</strong> {order.service}</p>
                    <p><strong>Amount:</strong> {order.price}</p>
                    <p><strong>Status:</strong> {order.orderStatus.replace('_'," ")}</p>
                    <p><strong>Payment Status:</strong> {order.paymentStatus.replace('_'," ")}</p>
                    <p><strong>Payment Reference:</strong> {order.paymentReference}</p>
                    <p><strong>Refund-UPI:</strong> {order.refundUpi}</p>
                </div>

                <div className="receipt-section">
                    <p><strong>Customer:</strong> {order.fullName?.trim()}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                </div>

                <div className="receipt-section">
                    <p><strong>Project Requirements:</strong></p>
                    <p>{order.projectRequirements}</p>
                </div>

                <div className="receipt-footer">
                    <p>Thank you for your purchase!</p>
                </div>

                <div className="button-print">
                    <button className="print-btn" onClick={handlePrint}>
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsComponent;
