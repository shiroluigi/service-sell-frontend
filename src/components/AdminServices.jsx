import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalUserContext } from "../helper/Context";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { IoMdAddCircleOutline } from "react-icons/io";

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const AdminServices = ({ seed, setSeed }) => {

    const { user } = useContext(GlobalUserContext);
    const [allServices, setAllServices] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [initialContentLoading, setInitialContentLoading] = useState(false);
    const [serviceDeleteWarining, setServiceDeleteWarining] = useState(false);
    const [deleteService, setDeleteService] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showServiceAdd, setShowServiceAdd] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [newServiceObject, setNewServiceObject] = useState({});
    const [editServiceObject, setEditServiceObject] = useState({});

    const getAllServices = async () => {
        setInitialContentLoading(true);
        try {
            const response = await axios.get(
                `${SERVER_URL}/public/services/all`,
                {
                    headers: {
                        Authorization: `${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            )
            setInitialContentLoading(false);
            // console.log(response?.data)
            setAllServices(response?.data);
        } catch (error) {
            setInitialContentLoading(false);
            toast.error("Some error occured", {
                draggable: true,
                closeOnClick: true,
                style: {
                    background: "#1a1a1a",
                    color: "#ffffff",
                    borderLeft: "6px solid #ff7a00",
                    fontSize: "15px",
                    fontWeight: "500",
                }
            });
        }
    }

    let filteredServices = useMemo(() => {
        let filteredServiesTemp = allServices;
        if (!searchFilter || searchFilter.trim().length == 0) {
            return filteredServiesTemp;
        } else {
            return filteredServiesTemp.filter((service) =>
            (service.service_name.toLowerCase().includes(searchFilter.toLowerCase())
                || service.description.toLowerCase().includes(searchFilter.toLowerCase())))
        }
    }, [allServices, searchFilter])

    useEffect(() => {
        getAllServices();
    }, []);


    const deleteServiceFunction = async () => {
        setIsLoading(true);
        try {
            await axios.post(
                `${SERVER_URL}/admin/services/delete`,
                {
                    ...deleteService,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            )

            setSeed(Math.random());
        } catch (error) {
            toast.error("Some error occured", {
                draggable: true,
                closeOnClick: true,
                style: {
                    background: "#1a1a1a",
                    color: "#ffffff",
                    borderLeft: "6px solid #ff7a00",
                    fontSize: "15px",
                    fontWeight: "500",
                }
            });
            setServiceDeleteWarining(false);
            setIsLoading(false);
            setDeleteService({});
        }
    }

    const addNewService = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${SERVER_URL}/admin/services/add`,
                {
                    ...newServiceObject
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            )
            setIsLoading(false);
            setSeed(Math.random());
            // console.log(response);
        } catch (error) {
            setIsLoading(false)
            // console.log(error)
            toast.error("Some error occured", {
                draggable: true,
                closeOnClick: true,
                style: {
                    background: "#1a1a1a",
                    color: "#ffffff",
                    borderLeft: "6px solid #ff7a00",
                    fontSize: "15px",
                    fontWeight: "500",
                }
            });
        }
        setShowServiceAdd(false);
    }

    const editService = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${SERVER_URL}/admin/services/edit`,
                {
                    ...editServiceObject
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            )
            setIsLoading(false);
            setSeed(Math.random());
            // console.log(response);
        } catch (error) {
            setIsLoading(false)
            // console.log(error)
            toast.error("Some error occured", {
                draggable: true,
                closeOnClick: true,
                style: {
                    background: "#1a1a1a",
                    color: "#ffffff",
                    borderLeft: "6px solid #ff7a00",
                    fontSize: "15px",
                    fontWeight: "500",
                }
            });
        }
        setEditServiceObject({});
        setShowEditModal(false);
    }

    // useEffect(() => console.log(editServiceObject, [editServiceObject]))

    if (initialContentLoading) return <div>Loading...</div>

    return (
        <div className="ao-container">
            <ToastContainer />
            <h2 className="ao-title">All Services</h2>
            <div className="au-filters">
                <input
                    className="au-input"
                    placeholder="Search name or description"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
                <div className="au-add-user">
                    <button
                        className="au-edit-btn"
                        style={
                            {
                                display: "flex",
                                alignItems: "center",
                            }
                        }
                        onClick={() => setShowServiceAdd(true)}>
                        <IoMdAddCircleOutline />
                        <span>Add a new service</span>
                    </button>
                </div>
            </div>
            {
                showServiceAdd &&
                <div className="au-user-add-modal" onClick={() => { setShowServiceAdd(false) }}>
                    <div className="au-user-add-box" onClick={(e) => { e.stopPropagation() }}>
                        <div className="au-user-add-form">
                            <form className="registerForm" method="POST" onSubmit={addNewService}>
                                <h1>Add Service</h1>
                                <label htmlFor="sname">Enter Service Name: </label>
                                <input
                                    className="ao-input"
                                    type="text"
                                    name="sname"
                                    value={newServiceObject.service_name || ""}
                                    onChange={(e) => {
                                        setNewServiceObject({ ...newServiceObject, service_name: e.target.value })
                                    }}
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="currency">Enter Currency:</label>
                                <input
                                    className="ao-input"
                                    type="text"
                                    name="currency"
                                    value={newServiceObject.currency || ""}
                                    onChange={(e) => {
                                        setNewServiceObject({ ...newServiceObject, currency: e.target.value })
                                    }}
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="price">Enter Price: </label>
                                <input
                                    className="ao-input"
                                    type="number"
                                    name="price"
                                    value={newServiceObject.price || ""}
                                    onChange={(e) => {
                                        setNewServiceObject({ ...newServiceObject, price: e.target.value })
                                    }}
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="desc">Enter Description: </label>
                                <textarea
                                    className="ao-input"
                                    type="text"
                                    name="desc"
                                    value={newServiceObject.description || ""}
                                    onChange={(e) => {
                                        setNewServiceObject({ ...newServiceObject, description: e.target.value })
                                    }}
                                    maxLength="2000"
                                />
                                <label htmlFor="duration">Enter Duration: </label>
                                <input
                                    className="ao-input"
                                    type="text"
                                    name="duration"
                                    value={newServiceObject.duration || ""}
                                    onChange={(e) => {
                                        setNewServiceObject({ ...newServiceObject, duration: e.target.value })
                                    }}
                                    maxLength="50"
                                    placeholder="Use format <number> Days"
                                />
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
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                showEditModal &&
                <div className="au-user-add-modal" onClick={() => { setEditServiceObject({}); setShowEditModal(false); }}>
                    <div className="au-user-add-box" onClick={(e) => { e.stopPropagation() }}>
                        <div className="au-user-add-form">
                            <form className="registerForm" method="POST" onSubmit={editService}>
                                <h1>Edit Service</h1>
                                <label htmlFor="sname">Enter Service Name: </label>
                                <input
                                    className="ao-input"
                                    type="text"
                                    name="sname"
                                    value={editServiceObject.service_name || ""}
                                    onChange={(e) => {
                                        setEditServiceObject({ ...editServiceObject, service_name: e.target.value })
                                    }}
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="currency">Enter Currency:</label>
                                <input
                                    className="ao-input"
                                    type="text"
                                    name="currency"
                                    value={editServiceObject.currency || ""}
                                    onChange={(e) => {
                                        setEditServiceObject({ ...editServiceObject, currency: e.target.value })
                                    }}
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="price">Enter Price: </label>
                                <input
                                    className="ao-input"
                                    type="number"
                                    name="price"
                                    value={editServiceObject.price || ""}
                                    onChange={(e) => {
                                        setEditServiceObject({ ...editServiceObject, price: e.target.value })
                                    }}
                                    maxLength="50"
                                    required
                                />
                                <label htmlFor="desc">Enter Description: </label>
                                <textarea
                                    className="ao-input"
                                    type="text"
                                    name="desc"
                                    value={editServiceObject.description || ""}
                                    onChange={(e) => {
                                        setEditServiceObject({ ...editServiceObject, description: e.target.value })
                                    }}
                                    maxLength="2000"
                                />
                                <label htmlFor="duration">Enter Duration: </label>
                                <input
                                    className="ao-input"
                                    type="text"
                                    name="duration"
                                    value={editServiceObject.duration || ""}
                                    onChange={(e) => {
                                        setEditServiceObject({ ...editServiceObject, duration: e.target.value })
                                    }}
                                    maxLength="50"
                                    placeholder="Use format <number> Days"
                                />
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
                                                Save
                                            </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {
                serviceDeleteWarining &&
                <div className="au-delete-user-modal">
                    <div className="au-delete-box">
                        <div className="au-delete-warning-message">
                            <span className="warning-message">Are you sure you want to delete?</span><br />
                            <b>ID:</b><i> {deleteService.id}</i><br />
                            <b>Name:</b> {deleteService.service_name}
                        </div>
                        {
                            !isLoading ?
                                <div className="au-warning-buttons">
                                    <button className="ao-edit-btn danger" onClick={deleteServiceFunction}> Yes </button>
                                    <button className="ao-edit-btn" onClick={() => { setDeleteService({}); setServiceDeleteWarining(false) }}> No </button>
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
            <table className="au-table">
                <thead className="au-thead">
                    <tr className="au-row">
                        <th className="au-th">Service ID</th>
                        <th className="au-th">Name</th>
                        <th className="au-th">Currency</th>
                        <th className="au-th">Price</th>
                        <th className="au-th">Duration</th>
                        <th className="au-th">Actions</th>
                    </tr>
                </thead>

                <tbody className="ao-tbody">
                    {filteredServices.length === 0 ? (
                        <tr className="au-row">
                            <td className="au-td" colSpan="6">
                                No services found
                            </td>
                        </tr>
                    ) : (
                        filteredServices.map((service) => (
                            <tr className="au-row" key={service.id}>
                                <td className="au-td">
                                    {service.id}
                                </td>
                                <td className="au-td">
                                    {service.service_name}
                                    <br />
                                    <small className="ao-muted">
                                        {service.description?.length > 8 ? service.description?.slice(0, 8) : service.description}...
                                    </small>
                                </td>
                                <td className="au-td">
                                    {service.currency}
                                </td>
                                <td className="au-td">{service.price}</td>
                                <td className="au-td">{service.duration}</td>
                                <td className="au-td centered smaller">
                                    <button
                                        className="au-edit-btn"
                                        onClick={() => { setShowEditModal(true); setEditServiceObject(service) }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="au-edit-btn danger"
                                        onClick={() => { setServiceDeleteWarining(true); setDeleteService(service) }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}


export default AdminServices;