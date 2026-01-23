const AdminNavigation = ({ className, setAllOrders, setAllUsers, setAllServices, resetAll}) => {
    
    return (
        <div className={className}>
            <button onClick={() => {
                resetAll();
                setAllOrders(true);

            }}>
                Orders
            </button>
            <button onClick={() => {
                resetAll();
                setAllUsers(true);
            }}>
                Users
            </button>
            <button onClick={() => {
                resetAll();
                setAllServices(true);
            }}>
                Shop
            </button>
        </div>
    );
};

export default AdminNavigation;
