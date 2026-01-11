import { useContext, useEffect, useState } from "react";
import "../assets/ProfileComponent.css"
import { GlobalUserContext } from "../helper/Context";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileComponent = () => {
    const { user } = useContext(GlobalUserContext);

    const [userOrders, setUserOrders] = useState([]);

    const getUserOrders = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/order/user`,
                {
                    id: user.id
                }
            )
            setUserOrders(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Some error occured, contact developer")
        }
    }

    useEffect(
        () => {
            getUserOrders()
        }
        , [])


    return (
        <>
            <div className="container">
                <div className="leftpanel">
                    <h1>Profile</h1>
                    <div className="userInfo">
                        <div className="userInfoItem">
                            <span className="indicators">Name : </span><span className="indicatorsData">{user.firstName} {user.lastName}</span>
                        </div>
                        <div className="userInfoItem">
                            <span className="indicators">Email : </span><span className="indicatorsData">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="rightpanel">
                    <div className="myOrders">
                        <h2 className="section-title">Order History</h2>
                        {userOrders.map((order) => {
                            return (
                                <div className="ordersCard" key={order.id}>
                                    <div className="leftPart">
                                        <table className="order-details-table">
                                            <tbody>
                                                <tr>
                                                    <td className="label">Customer</td>
                                                    <td className="value">{order.fullName}</td>
                                                    <td className="label">Status</td>
                                                    <td>
                                                        <span className={`status-tag ${order.orderStatus.toLowerCase()}`}>
                                                            {order.orderStatus.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="label">Date</td>
                                                    <td className="value">{new Date(order.timestamp).toLocaleDateString()}</td>
                                                    <td className="label">Payment</td>
                                                    <td className="value">{order.paymentStatus.replace('_', ' ')}</td>
                                                </tr>
                                                <tr>
                                                    <td className="label">Price</td>
                                                    <td className="value">{order.price}</td>
                                                    <td className="label">Service</td>
                                                    <td className="value">{order.service}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="rightPart">
                                        <button className="view-btn">View Details</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </>
    );
}

export default ProfileComponent;