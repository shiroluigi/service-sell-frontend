import axios from "axios";
import { useMemo, useContext, useEffect, useState } from "react";
import { GlobalUserContext } from "../helper/Context";
import "../assets/AdminUsers.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AdminUsers = () => {
    const { user } = useContext(GlobalUserContext);

    const [allUsers, setAllUsers] = useState([]);
    const [filterRole, setFilterRole] = useState("ALL");
    const [filterSearch, setFilterSearch] = useState("");

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(
                `${SERVER_URL}/admin/users/all`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`
                    }
                }
            );
            setAllUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const allRoles = useMemo(() => {
        return [...new Set(allUsers.map(u => u.role))];
    }, [allUsers]);

    const filteredUsers = useMemo(() => {
        let result = allUsers;

        if (filterRole !== "ALL") {
            result = result.filter(u => u.role === filterRole);
        }

        if (filterSearch) {
            const searchLower = filterSearch.toLowerCase();
            result = result.filter(u =>
                u.firstName?.toLowerCase().includes(searchLower) ||
                u.lastName?.toLowerCase().includes(searchLower) ||
                u.email?.toLowerCase().includes(searchLower)
            );
        }

        return result;
    }, [allUsers, filterRole, filterSearch]);

    return (
        <div className="au-container">
            <h2 className="au-title">All Users</h2>

            <div className="au-filters">
                <input
                    className="au-input"
                    placeholder="Search name or email"
                    onChange={(e) => setFilterSearch(e.target.value)}
                />
                <select
                    className="au-select"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                >
                    <option value="ALL">All Roles</option>
                    {allRoles.map(r => (
                        <option value={r} key={r}>{r}</option>
                    ))}
                </select>
            </div>

            <table className="au-table">
                <thead>
                    <tr>
                        <th className="au-th">Full Name</th>
                        <th className="au-th">Email</th>
                        <th className="au-th">Phone</th>
                        <th className="au-th">Role</th>
                        <th className="au-th">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr className="au-row" key={user.id}>
                            <td className="au-td">{user.firstName} {user.lastName}</td>
                            <td className="au-td">
                                {user.email}
                                <div className="au-muted">ID: {user.id}</div>
                            </td>
                            <td className="au-td">{user.phone}</td>
                            <td className="au-td">
                                <span className={`au-role au-role-${user.role}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="au-td">
                                <button className="au-edit-btn">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
