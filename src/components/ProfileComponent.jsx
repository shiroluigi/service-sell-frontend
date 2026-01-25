import { useContext, useEffect, useState } from "react";
import "../assets/ProfileComponent.css"
import { GlobalUserContext } from "../helper/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProfileComponent = () => {
    const navigate = useNavigate()
    const { user } = useContext(GlobalUserContext);
    const [userOrders, setUserOrders] = useState([]);
    const [ordersLoading, setOrderLoading] = useState(false);

    const getUserOrders = async () => {
        try {
            setOrderLoading(true);
            const response = await axios.post(
                `${SERVER_URL}/order/user`,
                {
                    id: user.user.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            );
            setUserOrders(response.data);
            setOrderLoading(false);
            // console.log(response.data)
        } catch (error) {
            setOrderLoading(false);
            // console.error("Some error occured, contact developer")
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
                            <span className="indicators">Name : </span><span className="indicatorsData">{user.user.firstName} {user.user.lastName}</span>
                        </div>
                        <div className="userInfoItem">
                            <span className="indicators">Email : </span><span className="indicatorsData">{user.user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="rightpanel">
                    <div className="myOrders">
                        <h2 className="section-title">Order History</h2>
                        {
                            ordersLoading ?
                                <div className="profile-orders-spinner">
                                    <TailSpin
                                        visible={true}
                                        height="40"
                                        width="40"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                                :
                                userOrders.length > 0 ?
                                    userOrders.map((order) => {
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
                                                    <button
                                                        className="view-btn"
                                                        onClick={() => navigate(`/order/${order.id}`)}
                                                    >View Details</button>
                                                </div>
                                            </div>
                                        );
                                    }) :
                                    <div className="profile-no-orders">
                                        No orders
                                    </div>

                        }

                    </div>
                </div>

            </div>
        </>
    );
}

export default ProfileComponent;