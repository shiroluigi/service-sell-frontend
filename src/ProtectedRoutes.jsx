import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (!localUser) {
          setAuthorized(false);
          return;
        }

        await axios.get(`${SERVER_URL}/user/authcheck`, {
          headers: {
            Authorization: `Bearer ${localUser.jwt}`
          }
        });

        setAuthorized(true);
      } catch (err) {
        localStorage.removeItem("user");
        navigate("/", { replace: true })
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Checking authentication...</div>;

  return authorized ? <Outlet /> : navigate("/", { replace: true });
}
