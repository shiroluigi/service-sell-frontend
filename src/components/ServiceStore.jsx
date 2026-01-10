import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/ServiceStore.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ServiceStore = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllServices()
    }, []);

    const getAllServices = async () => {
        const url = `${SERVER_URL}/services/all`;
        try {
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (e) {
            console.error("Error: ", e.response);
        }
    }

    return (
        <>
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
                                <button
                                    className="buy-button"
                                    onClick={
                                        () => 
                                        {
                                            navigate(`/checkout/${product.id}`)
                                        }
                                    }>
                                    Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ServiceStore;