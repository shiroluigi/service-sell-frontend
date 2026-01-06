import { useContext } from "react";
import "../assets/ProfileComponent.css"
import { GlobalUserContext } from "../helper/Context";

const ProfileComponent = () => {
    const {user,setUser} = useContext(GlobalUserContext);
    return(
    <>
        <div className="container">
            <div className="leftpanel">
                <h1>Profile</h1>
                <div className="userInfo">
                    <div className="userInfoItem">
                        <span className="indicators">Name : </span><span className="indicatorsData">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="userInfoItem">
                        <span className="indicators">Email : </span><span className="indicatorsData">{user.email}</span>
                    </div>
                </div>
            </div>
            <div className="rightpanel">
                <div className="myOrders">
                    myOrders
                </div>
            </div>
        </div>
    </>
    );
}

export default ProfileComponent;