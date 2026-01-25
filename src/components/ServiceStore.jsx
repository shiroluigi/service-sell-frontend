import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/ServiceStore.css';
import { GlobalUserContext } from "../helper/Context";
import { TailSpin } from "react-loader-spinner";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ServiceStore = () => {

    const [toggleSpinner, setToggleSpinner] = useState(false);

    const { user } = useContext(GlobalUserContext);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllServices()
    }, []);

    const getAllServices = async () => {
        setToggleSpinner(true);
        const url = `${SERVER_URL}/public/services/all`;
        try {
            const response = await axios.get(url,
                {
                    headers:{
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            );
            setProducts(response.data);
            setToggleSpinner(false);
        } catch (e) {
            // console.error("Error: ", e.response);
        }
    }

    return (
        <>
            {!toggleSpinner ?
                <div className="services-container">
                    <h1 className="services-title">My Services</h1>

                    <div className="services-grid">
                        {products.map((product) => (
                            <div className="service-card" key={product.id}>
                                <div className="card-content">
                                    <h2>{product.service_name}</h2>
                                    <p className="description">{product.description}</p>
                                </div>

                                <div className="card-footer">
                                    <div className="price">{product.currency} {product.price}</div>
                                    {user &&
                                        <button
                                            className="buy-button"
                                            onClick={
                                                () => {
                                                    navigate(`/checkout/${product.id}`)
                                                }
                                            }>
                                            Buy Now
                                        </button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="spinner-service-store">
                    <TailSpin
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }
        </>
    );
}

export default ServiceStore;