import AdminOrders from "./AdminOrders";

const AdminDisplay = ({ className, allOrders, allUsers, allServices }) => {
    return (
        <>
            <div className={className}>
                {allOrders && <AdminOrders />}
                {allUsers && "Showing all users"}
                {allServices && "Showing all services"}
            </div>
        </>
    );
};

export default AdminDisplay;
