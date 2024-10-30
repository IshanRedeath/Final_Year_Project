import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//import Home from "./pages/Home";
//import Unauthorized from "./pages/Unauthorized";

// Import routes from the separate files
import adminRoutes from "./adminRoutes";
import doctorRoutes from "./doctorRoutes";
import patientRoutes from "./patientRoutes";
import SessionRedirect from "./sessionRedirect";
import Headerbar from "../components/Common/Header/Headerbar";
import RouteAuth from "./RouteAuth";
import Login from "../pages/patientPortal/Login";
// Combine routes

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <SessionRedirect />
        <RootLayout />
      </>
    ),
    children: [
      adminRoutes,
      doctorRoutes,
      patientRoutes,
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "*",
    element: <SessionRedirect />,
  },
  {
    path: "/unauthorized",
    element: <h1>Unauthorized </h1>, //Replace with <Unauthorized/> component
  },
]);

function RootLayout() {
  return (
    <>
      <Headerbar />
      <div style={{ width: "auto", height: "45px" }}></div>
      <Outlet />
    </>
  );
}
