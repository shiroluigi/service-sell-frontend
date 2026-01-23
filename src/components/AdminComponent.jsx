import { useState } from "react";
import AdminNavigation from "./AdminNavigation";
import AdminDisplay from "./AdminDisplay";
import "../assets/Admin.css";

const AdminComponent = () => {
    const [allOrders, setAllOrders] = useState(false);
    const [allUsers, setAllUsers] = useState(false);
    const [allServices, setAllServices] = useState(false);
    const [order, setOrder] = useState();

     const resetAll = () => {
        setAllUsers(false);
        setAllOrders(false);
        setAllServices(false);
        setOrder(null);
    }

    return (
        <div className="admin-container">
            <AdminNavigation
                className="admin-nav"
                setAllOrders={setAllOrders}
                setAllUsers={setAllUsers}
                setAllServices={setAllServices}
                resetAll={resetAll}
            />
            <AdminDisplay
                className="admin-dis"
                allOrders={allOrders}
                allUsers={allUsers}
                allServices={allServices}
                setOrder = {setOrder}
                order = {order}

            />
        </div>
    );
};

export default AdminComponent;
