import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Wishlist.css";
import userStore from "../helper/store.js";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WishlistComponent = () => {
    const user = userStore.getState();
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(
                `${SERVER_URL}/wishlist/all?userId=${user?.user?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            );

            setWishlist(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                console.log("No wishlist found");
            } else {
                console.error(error);
            }
        }
    };

    const removeFromWishlist = async (wishlistId) => {
        try {
            await axios.delete(
                `${SERVER_URL}/wishlist/remove?wishId=${wishlistId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            );

            setWishlist((prev) => prev.filter(item => item.id !== wishlistId));

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className="wl-container">
            <h2 className="wishlist-title">Your Wishlist</h2>

            {wishlist.length === 0 ? (
                <p className="wishlist-empty">No items found</p>
            ) : (
                <div className="wishlist-list">
                    {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-item">
                            
                            <div className="wishlist-left">
                                <h3>{item.service_name}</h3>
                                <p className="wishlist-date">
                                    {new Date(item.timestamp).toLocaleString()}
                                </p>
                            </div>

                            <div className="wishlist-right">
                                <p className="wishlist-price">
                                    ₹{item.service_price}
                                </p>

                                <div className="wishlist-actions">
                                    <button
                                        className="buy-button"
                                        onClick={() => navigate(`/checkout/${item.service_id}`)}
                                    >
                                        Buy Now
                                    </button>

                                    <button
                                        className="remove-button"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistComponent;