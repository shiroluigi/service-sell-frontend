import AdminOrderEdit from "./AdminOrderEdit";
import AdminOrders from "./AdminOrders";

const AdminDisplay = ({ className, allOrders, allUsers, allServices , order, setOrder }) => {
    return (
        <>
            <div className={className}>
                {allOrders && !order && <AdminOrders orderId = {order} setOrderId = {setOrder}/>}
                {allOrders && order && <AdminOrderEdit order = {order} />}
                {allUsers && "Showing all users"}
                {allServices && "Showing all services"}
            </div>
        </>
    );
};

export default AdminDisplay;
