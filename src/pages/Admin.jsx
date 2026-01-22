import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminComponent from "../components/AdminComponent";
import { GlobalUserContext } from "../helper/Context";
import NavBar from "../components/NavBar";

const Admin = () => {
  const { user } = useContext(GlobalUserContext);

  if (!user || user.user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavBar />
      <AdminComponent />
    </>
  );
};

export default Admin;
