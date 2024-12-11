import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import adminRoutes from "./adminRoutes";
import doctorRoutes from "./doctorRoutes";
import patientRoutes from "./patientRoutes";
import SessionRedirect from "./SessionRedirect";
import PatientHeaderBar from "../components/Patient/PatientHeaderbar";
import RouteAuth from "./RouteAuth";
import Login from "../pages/patientPortal/Login";
import { useEffect } from "react";

// Combine routes

export const router = createBrowserRouter([
  {
    path: "/",

    element: <RootLayout />,

    children: [
      adminRoutes,
      doctorRoutes,
      patientRoutes,
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/unauthorized",
    element: <h1>Unauthorized </h1>, //Replace with <Unauthorized/> component
  },
]);

function RootLayout() {
  return (
    <>
      <SessionRedirect />
      <Outlet />
    </>
  );
}
