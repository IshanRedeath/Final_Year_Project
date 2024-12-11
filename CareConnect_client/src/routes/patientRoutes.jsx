import {} from "react";

import { Navigate, Outlet } from "react-router-dom";
import img from "../assets/Wallpapers/close-up-stethoscope-blank-blue-background.jpg";
import PatientHeaderbar from "../components/Patient/PatientHeaderbar";
import AvailabilityCheckLayout from "../pages/patientPortal/components/patient_visits/Desktop/AvailabilityCheck";
import { Grid2 } from "@mui/material";

const patientRoutes = {
  path: "patient-dashboard",
  element: (
    <>
      {" "}
      <PatientHeaderbar />
      <Grid2 sx={{ m: { xs: 12, lg: 8 } }}></Grid2>
      <Outlet />
    </>
  ),
  children: [
    {
      index: true,
      element: (
        <>
          <h1>Patient news and articles</h1>{" "}
          <img src={img} width="50%" height="800px" />
        </>
      ),
    },

    { path: "medication", element: <h1>Medication</h1> },
    { path: "test-results", element: <h1>test results</h1> },
    { path: "messages", element: <h1>messeges</h1> },
    {
      path: "visits",
      element: (
        <>
          <AvailabilityCheckLayout />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "add-appointment",
          element: <h1>appointment shedule</h1>,
        },
      ],
    },
    { path: "*", element: <Navigate to=".." /> },
  ],
};
export default patientRoutes;
