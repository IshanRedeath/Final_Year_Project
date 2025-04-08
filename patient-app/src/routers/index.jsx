import { createBrowserRouter, Navigate } from "react-router-dom";
import img from "../assets/doctor.jpg";
export const router = createBrowserRouter([
  {
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
  },
]);
