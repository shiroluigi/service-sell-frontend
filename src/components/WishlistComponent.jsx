import { useEffect } from "react";
import axios from "axios";
import userStore from "../helper/store.js";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WishlistComponent = () => {

    const user  = userStore.getState();

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
            // console.log(response)
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