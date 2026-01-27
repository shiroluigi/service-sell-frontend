import axios from "axios";
import { useMemo, useContext, useEffect, useState } from "react";
import { GlobalUserContext } from "../helper/Context";
import "../assets/AdminUsers.css";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AdminUsers = ({ setSeed }) => {
    const { user } = useContext(GlobalUserContext);

    const [allUsers, setAllUsers] = useState([]);
    const [filterRole, setFilterRole] = useState("ALL");
    const [filterSearch, setFilterSearch] = useState("");
    const [allRoles,setAllRoles] = useState([]);

    const [deleteUser, setDeleteUser] = useState({});

    const [showUserAdd, setShowUserAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userDeleteWarning, setUserDeleteWarning] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userAddRole, setUserAddRole] = useState("REGULAR_USER");
    const [errMsg, setErrMsg] = useState("");

    const fetchRoles = async () => {
        try {
            const response = await axios.get(
                `${SERVER_URL}/user/roles`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`
                    }
                }
            );
            setAllRoles(response?.data)
            // console.log(response)
        } catch (error) {
            toast.error("Some error occured",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        background: "#1a1a1a",
                        color: "#ffffff",
                        borderLeft: "6px solid #ff7a00",
                        fontSize: "15px",
                        fontWeight: "500",
                    }
                }
            )
        }
    };

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
            setAllUsers(response.data.filter(u => u.email != user?.user?.email));
        } catch (error) {
            // console.log(error);
            toast.error("Some error occured",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        background: "#1a1a1a",
                        color: "#ffffff",
                        borderLeft: "6px solid #ff7a00",
                        fontSize: "15px",
                        fontWeight: "500",
                    }
                }
            )
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/admin/users/add`,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    role: userAddRole,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`
                    }
                }
            )
            if (response?.status == 201) {
                setShowUserAdd(false);
                setSeed(Math.random());
            }
            else
                setErrMsg(response?.data?.errMsg)
        } catch (error) {
            setErrMsg(error?.response?.data?.errMsg)
        }
    }

    useEffect(() => {
        fetchAllUsers();
        fetchRoles();
    }, []);

    // const allRoles = useMemo(() => {
    //     return [...new Set(allUsers.map(u => u.role))];
    // }, [allUsers]);

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

    const deleteUserFunction = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${SERVER_URL}/admin/users/delete`,
                {
                    email: deleteUser.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`
                    }
                }
            )
            if (response?.status == "200") {
                setIsLoading(false);
                setUserDeleteWarning(false);
                setSeed(Math.random());
            }
            // console.log(response)
        } catch (error) {
            setIsLoading(false);
            // console.log(error)
            toast.error(error?.response?.data?.errMsg,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        background: "#1a1a1a",
                        color: "#ffffff",
                        borderLeft: "6px solid #ff7a00",
                        fontSize: "15px",
                        fontWeight: "500",
                    }
                }
            )
        }
    }

    return (
        <div className="au-container">
            <ToastContainer className="au-error-box" />
            {
                userDeleteWarning &&
                <div className="au-delete-user-modal">
                    <div className="au-delete-box">
                        <div className="au-delete-warning-message">
                            <span className="warning-message">Are you sure you want to delete?</span><br />
                            <b>Name:</b><i> {deleteUser.firstName} {deleteUser.lastName} </i><br />
                            <b>Email:</b> {deleteUser.email}
                        </div>
                        {
                            !isLoading ?
                                <div className="au-warning-buttons">
                                    <button className="ao-edit-btn danger" onClick={() => deleteUserFunction()}> Yes </button>
                                    <button className="ao-edit-btn" onClick={() => { setDeleteUser({}); setUserDeleteWarning(false) }}> No </button>
                                </div>
                                :
                                <div className="au-spinner-button">
                                    <TailSpin
                                        width={40}
                                        height={40}
                                        className="au-add-spinner"
                                        color="black"
                                    />
                                </div>
                        }
                    </div>
                </div>
            }
            {
                showUserAdd &&
                <div className="au-user-add-modal" onClick={() => setShowUserAdd(false)}>
                    <div className="au-user-add-box" onClick={(e) => e.stopPropagation()}>
                        <div className="au-user-add-form">
                            <form className="registerForm" method="POST" onSubmit={addUser}>
                                <h1>Add User</h1>
                                <label htmlFor="firstName">Enter First Name: </label>
                                <input
                                    className="ao-input"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    name="firstName"
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="lastName">Enter Last Name: </label>
                                <input
                                    className="ao-input"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    name="lastName"
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="email">Enter Email: </label>
                                <input
                                    className="ao-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    name="email"
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="password">Enter Password:</label>
                                <input
                                    className="ao-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="text"
                                    name="password"
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="role">Select role:</label>
                                {/* //TODO: fetch roles from server */}
                                <select
                                    className="au-select"
                                    value={userAddRole}
                                    onChange={(e) => setUserAddRole(e.target.value)}
                                    name="role" >
                                    {allRoles.map(r => (
                                        <option value={r} key={r}>{r}</option>
                                    ))}
                                </select>
                                <div className="au-spinner-button">
                                    {
                                        isLoading ?
                                            <TailSpin
                                                width={40}
                                                height={40}
                                                className="au-add-spinner"
                                                color="black"
                                            />
                                            :
                                            <button
                                                type="submit"
                                                className="ao-edit-btn">
                                                Add
                                            </button>
                                    }
                                </div>
                                <span className="errorMessage">{errMsg}</span>
                            </form>
                        </div>
                    </div>
                </div>
            }
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
                <div className="au-add-user">
                    <button
                        className="au-edit-btn"
                        onClick={() => setShowUserAdd(true)}>
                        New User
                    </button>
                </div>
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
                    {
                        filteredUsers.length === 0 ?
                            <tr>
                                <td className="au-td" colSpan={5}>No Users</td>
                            </tr>
                            :
                            filteredUsers.map(user => (
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
                                    <td className="au-td centered smaller">
                                        <button className="au-edit-btn">Edit</button>
                                        <button className="au-edit-btn danger"
                                            onClick={() => {
                                                setUserDeleteWarning(true);
                                                setDeleteUser(user);
                                            }}>Delete</button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
