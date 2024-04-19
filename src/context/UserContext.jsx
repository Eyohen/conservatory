/* eslint-disable react/prop-types */
// UserContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";
// import { toast } from "react-toastify";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const storedUser = localStorage.getItem("currentUser");
    const accessToken = localStorage.getItem("access_token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false); // Set loading to false after user is set
      return;
    }

    if (!accessToken) {
      setLoading(false); // Ensure to set loading to false if no user or token is found
      return;
    }

    try {
      const res = await axios.get(`${URL}/api/auth/refetch`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("access_token");
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Ensure loading is set to false after all operations
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
