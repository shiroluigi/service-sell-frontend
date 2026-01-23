import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalUserContext } from "../helper/Context";
import "../assets/AdminOrders.css"

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AdminOrders = ({ setOrderId, orderId }) => {
    const { user } = useContext(GlobalUserContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderStatusFilter, setOrderStatusFilter] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
    const [search, setSearch] = useState("");

    const getOrders = async () => {
        try {
            const response = await axios.get(
                `${SERVER_URL}/admin/orders/all`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    },
                }
            );
            setOrders(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const a =
                !orderStatusFilter || order.orderStatus === orderStatusFilter;
            const b =
                !paymentStatusFilter ||
                order.paymentStatus === paymentStatusFilter;
            const c =
                !search ||
                order.fullName.toLowerCase().includes(search.toLowerCase()) ||
                order.id.toLowerCase().includes(search.toLowerCase());
            return a && b && c;
        });
    }, [orders, orderStatusFilter, paymentStatusFilter, search]);

    const handleEdit = (order) => {
        alert(`Edit order ${order.id}`);
    };

    if (loading) {
        return <p className="ao-loading">Loading orders...</p>;
    }

    return (
        <div className="ao-container">
            <h2 className="ao-title">All Orders</h2>

            <div className="ao-filters">
                <input
                    className="ao-input"
                    type="text"
                    placeholder="Search by name or order ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="ao-select"
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                >
                    <option value="">All Order Status</option>
                    <option value="ORDER_PLACED">ORDER_PLACED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>

                <select
                    className="ao-select"
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                >
                    <option value="">All Payment Status</option>
                    <option value="PENDING_APPROVAL">PENDING_APPROVAL</option>
                    <option value="PAID">PAID</option>
                    <option value="REFUNDED">REFUNDED</option>
                </select>
            </div>

            <table className="ao-table">
                <thead className="ao-thead">
                    <tr className="ao-row">
                        <th className="ao-th">Order ID</th>
                        <th className="ao-th">Customer</th>
                        <th className="ao-th">Service</th>
                        <th className="ao-th">Price</th>
                        <th className="ao-th">Order Status</th>
                        <th className="ao-th">Payment Status</th>
                        <th className="ao-th">Date</th>
                        <th className="ao-th">Actions</th>
                    </tr>
                </thead>

                <tbody className="ao-tbody">
                    {filteredOrders.length === 0 ? (
                        <tr className="ao-row">
                            <td className="ao-td" colSpan="8">
                                No orders found
                            </td>
                        </tr>
                    ) : (
                        filteredOrders.map((order) => (
                            <tr className="ao-row" key={order.id}>
                                <td className="ao-td">
                                    {order.id.slice(0, 8)}...
                                </td>
                                <td className="ao-td">
                                    {order.fullName}
                                    <br />
                                    <small className="ao-muted">
                                        {order.user?.email}
                                    </small>
                                </td>
                                <td className="ao-td">
                                    {order.service?.service_name}
                                </td>
                                <td className="ao-td">{order.price}</td>
                                <td className="ao-td">
                                    <span
                                        className={`ao-status ao-status-${order.orderStatus}`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="ao-td">
                                    <span
                                        className={`ao-status ao-status-${order.paymentStatus}`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="ao-td">
                                    {new Date(order.timestamp).toLocaleDateString()}
                                </td>
                                <td className="ao-td">
                                    <button
                                        className="ao-edit-btn"
                                        onClick={() => setOrderId(order)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
