import { UPDATE_USER,REMOVE_USER } from "./storeConstants";

const userReducer = (state = JSON.parse(localStorage.getItem("user")) || null , action) => {
    if (action.type == UPDATE_USER){
        action.payload
        ? localStorage.setItem("user", JSON.stringify(action.payload))
        : localStorage.removeItem("user");
        return action.payload;
    }
    else if (action.type == REMOVE_USER){
        localStorage.removeItem("user");
        return null;
    }
    else{
        return null;
    }
}
export default userReducer;