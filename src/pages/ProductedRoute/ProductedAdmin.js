import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AdminHome from "../Admin/AdminHome";

function ProductedAdmin() {
  const { user, loggedIn } = useAuth();

  return (
    <>
      <AdminHome />
      {/* {loggedIn === true && user.role === "user" && <Navigate to={"/"} />} */}
    </>
  );
}

export default ProductedAdmin;
