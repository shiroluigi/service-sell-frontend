import AdminOrderEdit from "./AdminOrderEdit";
import AdminOrders from "./AdminOrders";

const AdminDisplay = ({ className, allOrders, allUsers, allServices , order, setOrder }) => {
    return (
        <>
            <div className={className}>
                {allOrders && !order && <AdminOrders orderObject = {order} setOrderObject= {setOrder}/>}
                {allOrders && order && <AdminOrderEdit order = {order} setOrder={setOrder} />}
                {allUsers && "Showing all users"}
                {allServices && "Showing all services"}
            </div>
        </>
    );
};

export default AdminDisplay;
