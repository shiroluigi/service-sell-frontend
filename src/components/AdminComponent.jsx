import { useState } from "react";
import AdminNavigation from "./AdminNavigation";
import AdminDisplay from "./AdminDisplay";
import "../assets/Admin.css";

const AdminComponent = () => {
    const [allOrders, setAllOrders] = useState(false);
    const [allUsers, setAllUsers] = useState(false);

    return (
        <div className="admin-container">
            <AdminNavigation
                className="admin-nav"
                setAllOrders={setAllOrders}
                setAllUsers={setAllUsers}
            />
            <AdminDisplay
                className="admin-dis"
                allOrders={allOrders}
                allUsers={allUsers}
            />
        </div>
    );
};

export default AdminComponent;
