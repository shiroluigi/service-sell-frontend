import axios from "axios";
import "../assets/AdminOrderEdit.css"
import { useContext, useEffect, useState } from "react";
import { GlobalUserContext } from "../helper/Context";

const SERVER_URL=import.meta.env.VITE_SERVER_URL;

const AdminOrderEdit = ({ order, setOrder }) => {
    // console.log(order)
    const {user} = useContext(GlobalUserContext);
    const [isLoading,setIsLoading] = useState(false);
    const [success,setSuccess] = useState(false);

    const [orderStatus, setOrderStatus] = useState(order?.orderStatus);
    const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus);
    const [orderUpdatRequestObject, setOrderUpdateRequestObject] = useState({
        id: order?.id,
        orderStatus,
        paymentStatus
    });
    useEffect(() => {
        setOrderUpdateRequestObject(
            {
                ...orderUpdatRequestObject,
                orderStatus: orderStatus,
                paymentStatus: paymentStatus
            }
        )
    }, [orderStatus, paymentStatus])
    
    const submitChanges = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${SERVER_URL}/admin/order/edit`,
                {
                    ...orderUpdatRequestObject
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            )
            setIsLoading(false);
            setSuccess(true)
            setTimeout(() => {
                setOrder(null)
            }, 2000);
        } catch (error) {
            // console.log(error)
            setIsLoading(false);
            //TODO: handle error properly
            resetChanges();
        }
    }

    const resetChanges = () => {
        setOrderStatus(order?.orderStatus);
        setPaymentStatus(order?.paymentStatus);
    }

    // useEffect(()=> console.log(orderUpdatRequestObject), [orderUpdatRequestObject])

    if (isLoading) return <div>Loading...</div>;
    
    return (
        <>
            {success && <div className="aoe-floater">
                <div className="aoe-floaterbox">
                    <div className="aoe-floater-text">
                        Success!<br/>
                        Order updated...
                    </div>
                </div>
            </div>}
            <div className="ao-container">
                <div className="aoe-heading" onClick={() => setOrder(null)}>
                    <h2><span className="aoe-goback">All Orders</span> {">"} {order.id}</h2>
                </div>
                <div className="aoe-title">
                    <h3>Order Info</h3>
                </div>
                <table className="aoe-table">
                    <tbody>

                        <tr>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Order Status</div>
                                    <select className="aoe-inputs" onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
                                        {/* TODO: FETCH FROM SERVER */}
                                        {["ORDER_PLACED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((statuses) => {
                                            if (order?.orderStatus === statuses)
                                                return <option value={statuses} key={statuses} hidden>{statuses.replace("_", " ")}</option>
                                            else
                                                return <option value={statuses} key={statuses}>{statuses.replace("_", " ")}</option>
                                        })}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Service Name</div>
                                    <input className="aoe-inputs" value={order?.service?.service_name} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Client Name</div>
                                    <input className="aoe-inputs" value={order?.fullName} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Phone</div>
                                    <input className="aoe-inputs" value={order?.phone} readOnly disabled />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Payment Status</div>
                                    <select className="aoe-inputs" onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus}>
                                        {/* TODO: FETCH FROM SERVER */}
                                        {["PAID", "PENDING", "PENDING_APPROVAL", "REJECTED", "REFUNDED", "CANCELLED"].map((statuses) => {
                                            if (order?.paymentStatus === statuses)
                                                return <option value={statuses} key={statuses} hidden>{statuses.replace("_", " ")}</option>
                                            else
                                                return <option value={statuses} key={statuses}>{statuses.replace("_", " ")}</option>
                                        })}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Payment Reference </div>
                                    <input className="aoe-inputs" value={order?.paymentReference} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Refund UPI</div>
                                    <input className="aoe-inputs" value={order?.refundUpi} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Price</div>
                                    <input className="aoe-inputs" value={order?.price} readOnly disabled />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Requirements</div>
                                    <textarea rows={4} className="aoe-inputs" value={order?.projectRequirements} readOnly disabled />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="aoe-action-buttons">
                    <button className="aoe-reset-button" onClick={resetChanges}>Reset</button>
                    <button className="aoe-apply-button" onClick={submitChanges}>Apply</button>
                </div>
                <div className="aoe-title">
                    <h3>Service Info</h3>
                </div>
                <table className="aoe-table">
                    <tbody>

                        <tr>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Service ID </div>
                                    <input className="aoe-inputs" value={order?.service?.id} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Price</div>
                                    <input className="aoe-inputs" value={order?.service?.currency + " " + order?.service?.price} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Service Name</div>
                                    <input className="aoe-inputs" value={order?.service?.service_name} readOnly disabled />
                                </div>
                            </td>
                            <td>
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Duration</div>
                                    <input className="aoe-inputs" value={order?.service?.duration} readOnly disabled />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <div className="aoe-info-piece">
                                    <div className="aoe-input-descriptor">Description</div>
                                    <textarea rows={4} className="aoe-inputs" value={order?.service?.description} readOnly disabled />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminOrderEdit;