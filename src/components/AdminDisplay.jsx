import { useState } from "react";
import AdminOrderEdit from "./AdminOrderEdit";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminServices from "./AdminServices";

const AdminDisplay = ({ className, allOrders, allUsers, allServices , order, setOrder }) => {
    const [seed, setSeed] = useState(Math.random());
    return (
        <>
            <div className={className}>
                {allOrders && !order && <AdminOrders orderObject = {order} setOrderObject= {setOrder}/>}
                {allOrders && order && <AdminOrderEdit order = {order} setOrder={setOrder}/>}
                {allUsers && <AdminUsers key={seed} setSeed={setSeed}/>}
                {allServices && <AdminServices key={seed} setSeed={setSeed} />}
            </div>
        </>
    );
};

export default AdminDisplay;
