import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RouteAuth = ({
  allowedRoles = ["admin", "patient", "doctor", "pharmacist", "receptionist"],
}) => {
  // Default value for allowedRoles is [].
  const user = { role: "doctor" }; // Example user role
  // const { user } = useUser(); // Replace with real user role from context or state

  if (user) {
    return allowedRoles.includes(user?.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" />
    );
  }

  return <Navigate to="/login" />;
};

export default RouteAuth; //This is other method how to export a default function
