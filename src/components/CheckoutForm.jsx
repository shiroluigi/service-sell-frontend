import { useEffect, useState } from "react";
import "../assets/CheckoutForm.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const UPI_ADDRESS = import.meta.env.VITE_PAYMENT_UPI_ADDRESS;

const CheckoutForm = ({ serviceId, user }) => {
    const navigate = useNavigate();
    const [toggleSpinner, setToggleSpinner] = useState(false);
    const [userId, setUserId] = useState(user.user.id);
    const [userFullName, setUserFullName] = useState(user.user.firstName + " " + user.user.lastName);
    const [userEmail, setUserEmail] = useState(user.user.email);
    const [userPhone, setUserPhone] = useState(user.user.phone || "");
    const [projectRequirements, setProjectRequirements] = useState("")
    const [paymentReference, setPaymentReference] = useState("")
    const [refundUpi, setRefundUpi] = useState("")

    const [serviceInfo, setServiceInfo] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/public/services/single?id=${serviceId}`);
            setServiceInfo(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const checkoutUserOrder = async (e) => {
        e.preventDefault();
        setToggleSpinner(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!emailRegex.test(userEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!phoneRegex.test(userPhone)) {
            alert("Please enter a valid phone number (10-15 digits).");
            return;
        }

        const request = {
            user: userId,
            fullName: userFullName,
            email: userEmail,
            phone: userPhone,
            projectRequirements,
            paymentReference,
            refundUpi,
            service: serviceId
        }

        try {
            const response = await axios.post(
                `${SERVER_URL}/order/place`,
                {
                    ...request
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`
                    }
                }
            )
            if (response.data.response == "OK") {
                setToggleSpinner(false);
                navigate("/profile");
            }
        } catch (error) {
            setToggleSpinner(false)
            toast.error(error.response.data.errMsg, {
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
                },
                icon: "⚠️"
            });


            console.error("Error:", error.response)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="checkoutForm">
                <h1>Checkout</h1>

                <div className="sections">
                    <div className="itemInformation">
                        <h2>Service Details</h2>

                        <div className="infoRow">
                            <span>Service</span>
                            <span>{serviceInfo.service_name}</span>
                        </div>

                        <div className="infoRow">
                            <span>Duration</span>
                            <span>{serviceInfo.duration}</span>
                        </div>

                        <div className="infoRow total">
                            <span>Total</span>
                            <span>{serviceInfo.currency} {serviceInfo.price}</span>
                        </div>

                        <div className="disclaimer">
                            <span className="note">Note:</span>
                            <br />
                            <span>The service will enter developement after payment confirmation by the team. This process may take
                                upto <b>7 DAYS</b>.
                                You will receive payment confirmation by email.
                                From there on out, the team will stay in touch until project completion.
                                Furthermore, all the required materials must be provided by the client.
                            </span>
                        </div>
                        <div className="disclaimer">
                            <span>
                                <b>
                                    <ul>
                                        <li>
                                            Please keep payment proof and if any problems arise or order did not confirm by
                                            the said time, please contact through mail.
                                        </li>
                                        <li>
                                            Please donot contact before the stipulated time and keep and eye on your order status in your
                                            profile, if 'REJECTED' the refund will be processed immediately to the given UPI address.
                                        </li>
                                    </ul>
                                </b>
                            </span>
                        </div>

                    </div>

                    <div className="form">
                        <h2>Billing Information</h2>

                        <form onSubmit={checkoutUserOrder}>
                            <input type="text" placeholder="Full Name" maxLength="50"
                                value={userFullName}
                                onChange={(e) => {
                                    setUserFullName(e.target.value)
                                }}
                                required />
                            <input type="email" placeholder="Email Address" maxLength="50"
                                value={userEmail}
                                onChange={(e) => {
                                    setUserEmail(e.target.value)
                                }}
                                required />
                            <input type="tel" placeholder="Phone Number"
                                value={userPhone}
                                pattern="[0-9]{10,15}"
                                title="Please enter a valid phone number (10 to 15 digits)"
                                onChange={(e) => {
                                    setUserPhone(e.target.value)
                                }} required />
                            <textarea placeholder="Project Requirements" rows="4" maxLength="1000"
                                value={projectRequirements}
                                onChange={(e) => {
                                    setProjectRequirements(e.target.value)
                                }} required></textarea>
                            <label htmlFor="paymentReference">UPI ID: {UPI_ADDRESS}</label>
                            <input type="text" name="paymentReference" placeholder="Payment reference ID" maxLength="50"
                                value={paymentReference}
                                onChange={(e) => {
                                    setPaymentReference(e.target.value)
                                }} required />
                            <input type="text" placeholder="Refund UPI ID" maxLength="50"
                                value={refundUpi}
                                onChange={(e) => {
                                    setRefundUpi(e.target.value)
                                }} required />
                            {!toggleSpinner ?
                                <button
                                    type="submit">
                                    Go
                                </button>
                                :
                                <div className="spinner">
                                    <TailSpin
                                        visible={true}
                                        height="40"
                                        width="40"
                                        className="spinner"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CheckoutForm;
