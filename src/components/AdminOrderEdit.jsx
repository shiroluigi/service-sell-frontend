import "../assets/AdminOrderEdit.css"
import { useEffect, useState } from "react";

const AdminOrderEdit = ({ order,setOrder }) => {
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus);
    const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus);
    const [orderUpdatRequestObject, setOrderUpdateRequestObject] = useState({
        orderId: order?.id,
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
    } , [orderStatus,paymentStatus])
    // console.log(order);
    // useEffect(() => console.log(orderUpdatRequestObject),[orderUpdatRequestObject])
    return (
        <>
            <div className="ao-container">
                <div className="aoe-heading" onClick={() => setOrder(null)}>
                    <h2><span className="aoe-goback">All Orders</span> {">"} {order.id}</h2>
                </div>
                <div className="aoe-title">
                    <h3>Order Info</h3>
                </div>
                <table className="aoe-table">
                    <tr>
                        <td>
                            <div className="aoe-info-piece">
                                <div className="aoe-input-descriptor">Order Status</div>
                                <select className="aoe-inputs" onChange={(e) => setOrderStatus(e.target.value)} defaultValue={orderStatus}>
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
                                <select className="aoe-inputs" onChange={(e) => setPaymentStatus(e.target.value)} defaultValue={paymentStatus}>
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
                        <td colspan="4">
                            <div className="aoe-info-piece">
                                <div className="aoe-input-descriptor">Requirements</div>
                                <textarea rows={4} className="aoe-inputs" value={order?.projectRequirements} readOnly disabled />
                            </div>
                        </td>
                    </tr>
                </table>
                <div className="aoe-action-buttons">
                    <button>Reset</button>
                    <button>Apply</button>
                </div>
                <div className="aoe-title">
                    <h3>Service Info</h3>
                </div>
                <table className="aoe-table">
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
                                <input className="aoe-inputs" value={order?.service?.name} readOnly disabled />
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
                        <td colspan="4">
                            <div className="aoe-info-piece">
                                <div className="aoe-input-descriptor">Description</div>
                                <textarea rows={4} className="aoe-inputs" value={order?.service?.description} readOnly disabled />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default AdminOrderEdit;