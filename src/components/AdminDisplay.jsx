const AdminDisplay = ({ className, allOrders, allUsers }) => {
    return (
        <>
            <div className={className}>
                {allOrders && "Showing all orders"}
                {allUsers && "Showing all users"}
            </div>
        </>
    );
};

export default AdminDisplay;
