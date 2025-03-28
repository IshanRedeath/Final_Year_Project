import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
  useLocation,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';
import adminRoutes from './adminRoutes';
import doctorRoutes from './doctorRoutes';
import patientRoutes from './patientRoutes';
import SessionRedirect from './SessionRedirect';
import PatientHeaderBar from '../layouts/PatientDashboard/PatientHeaderbar';
import RouteAuth from './RouteAuth';
import Login from '../pages/patientPortal/Login';
import { useEffect } from 'react';
import { Dashboard } from '@mui/icons-material';
import DashboardLayout from '../layouts/Dashboard';
import Loading from 'components/Loading';
import AddUser from 'pages/AdminDashboard/Users/temp/AddUser';
import PrintableComponent from 'components/PrintView/index';
import PrintView from 'components/PrintView';
import PrintViewHeader from 'components/PrintView/PrintViewHeader';
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
  { path: '/test', element: <PrintView /> },
]);

function RootLayout() {
  const { state } = useNavigation();

  const isLoading = state === 'loading';
  return (
    <>
      {/* <SessionRedirect /> */}
      <DashboardLayout />
      <ScrollRestoration />
      <Loading loadingState={isLoading} />
    </>
  );
}
