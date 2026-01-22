const AdminNavigation = ({ className, setAllOrders, setAllUsers }) => {

    const resetAll = () => {
        setAllUsers(false);
        setAllOrders(false);
    }

    return (
        <div className={className}>
            <button onClick={() => {
                resetAll();
                setAllOrders(true);

            }}>
                Show All Orders
            </button>
            <button onClick={() => {
                resetAll();
                setAllUsers(true);
            }}>
                Show All Orders
            </button>
        </div>
    );
};

export default AdminNavigation;
