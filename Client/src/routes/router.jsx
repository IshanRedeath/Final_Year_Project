import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import adminRoutes from './adminRoutes';
import doctorRoutes from './doctorRoutes';
import patientRoutes from './patientRoutes';
import SessionRedirect from './SessionRedirect';
import PatientHeaderBar from '../components/Patient/PatientHeaderbar';
import RouteAuth from './RouteAuth';
import Login from '../pages/patientPortal/Login';
import { useEffect } from 'react';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from '../layouts/Dashboard';

// Combine routes
//TODO: EDit session redirect, add patient routes, add unauthorized route
export const router = createBrowserRouter([
  {
    path: '/',

    element: <RootLayout />,

    children: [
      adminRoutes,
      doctorRoutes,

      //FIXME: Delete below line
    ],
  },
  patientRoutes,
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  { path: '/login', element: <Login /> },
  {
    path: '/unauthorized',
    element: <h1>Unauthorized </h1>, //Replace with <Unauthorized/> component
  },
]);

function RootLayout() {
  return (
    <>
      {/* <SessionRedirect /> */}
      <DashboardLayout />
    </>
  );
}
