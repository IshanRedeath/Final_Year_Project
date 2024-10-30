import {} from "react";
import PatientNavigation from "../components/Patient/PatientNavigation";
import { Outlet } from "react-router-dom";

const patientRoutes = {
  path: "patient-dashboard",
  element: (
    <>
      <PatientNavigation /> <Outlet />
    </>
  ),
  children: [
    { index: true, element: <h1>Patient news and articles</h1> },

    { path: "medication", element: <h1>Medication</h1> },
    { path: "test-results", element: <h1>test results</h1> },
    { path: "messages", element: <h1>messeges</h1> },
    { path: "visits", element: <h1>Visits</h1> },
  ],
};
export default patientRoutes;
