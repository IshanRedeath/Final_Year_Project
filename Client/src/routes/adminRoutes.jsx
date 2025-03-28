import React from 'react';
import SamplePage from 'pages/temp/sample-page';
import { Navigate, Outlet, redirect } from 'react-router-dom';
import Users from 'pages/AdminDashboard/Users';
import { addUserRoutes } from 'pages/AdminDashboard/Users/temp/AddUser';
import AddUser from 'pages/AdminDashboard/Users/AddUser';
import Priviledges from 'pages/AdminDashboard/Priviledges';
import AppointmentStepper from 'pages/AdminDashboard/Appointment/AppointmentStepper';
import Doctors from 'pages/AdminDashboard/Doctors/DoctorView';
import DoctorAdd from 'pages/AdminDashboard/Doctors/DoctorAdd';
import { Update } from '@mui/icons-material';
import UpdateUser from 'pages/AdminDashboard/Users/UpdateUser';
import PriviledgeForm from 'pages/AdminDashboard/Priviledges/PriviledgeForm';
import AddPriviledge from 'pages/AdminDashboard/Priviledges/AddPriviledge';
import UpdatePriviledge from 'pages/AdminDashboard/Priviledges/UpdatePriviledge';

//export router object by createbrowserRouter
const adminRoutes = {
  path: '/admin-dashboard',
  element: <Outlet />,
  children: [
    { index: true, element: <h1>Admin Dashboard</h1> },
    {
      path: 'appointments',
      children: [
        { index: true, element: <AppointmentStepper /> },
        { path: 'calendar', element: <h1>Calendar</h1> },
      ],
    },

    {
      path: 'users',

      children: [
        { index: true, element: <Users /> },

        {
          path: 'add',
          element: <AddUser />,
        },
        {
          path: 'edit',

          children: [
            { index: true, element: <Navigate to="/admin-dashboard/users" /> },
            { path: ':id', element: <UpdateUser /> },
          ],
        },
      ],
    },
    {
      path: 'priviledges',
      children: [
        { index: true, element: <Priviledges /> },

        {
          path: 'add',
          element: <AddPriviledge />,
        },
        {
          path: 'edit',

          children: [
            { index: true, element: <Navigate to="/admin-dashboard/priviledges" /> },
            { path: ':id', element: <UpdatePriviledge /> },
          ],
        },
      ],
    },
    {
      path: 'doctors',
      children: [
        {
          index: true,
          element: <Doctors />,
        },
        {
          path: 'add',
          element: <DoctorAdd />,
        },
      ],
    },
  ],
};
export default adminRoutes;
