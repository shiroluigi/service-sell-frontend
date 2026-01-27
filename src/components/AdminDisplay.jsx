import { useState } from "react";
import AdminOrderEdit from "./AdminOrderEdit";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";

const AdminDisplay = ({ className, allOrders, allUsers, allServices , order, setOrder }) => {
    const [seed, setSeed] = useState(Math.random());
    return (
        <>
            <div className={className}>
                {allOrders && !order && <AdminOrders orderObject = {order} setOrderObject= {setOrder}/>}
                {allOrders && order && <AdminOrderEdit order = {order} setOrder={setOrder}/>}
                {allUsers && <AdminUsers key={seed} setSeed={setSeed}/>}
                {allServices && "Showing all services"}
            </div>
        </>
    );
};

export default AdminDisplay;
