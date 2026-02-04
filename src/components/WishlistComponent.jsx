import { useContext, useEffect } from "react";
import { GlobalUserContext } from "../helper/Context.jsx";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WishlistComponent = () => {

    const { user } = useContext(GlobalUserContext)

    const fetchWishlist = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/wishlist/all?userId=${user?.user.id}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${user.jwt}`,
                        "ngrok-skip-browser-warning": "true"
                    }
                }
            )
            console.log(response)
        } catch (error) {
            if(error.response.status == "404")
                console.log(error)
        }
    }

    useEffect(() => { fetchWishlist() }, [])

    return (
        <>

        </>
    )
}

export default WishlistComponent;