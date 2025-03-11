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
import { set } from 'lodash';

// Combine routes
//TODO: EDit session redirect, add patient routes, add unauthorized route
export const router = createBrowserRouter([
  {
    path: '/',

    element: <RootLayout />,
    loader: async ({ request }) => {
      setTimeout(() => {
        console.log('hello');
      }, 5000);
      return null;
    },
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
  const { state } = useNavigation();
  console.log('Navigation state is : ', state);
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
