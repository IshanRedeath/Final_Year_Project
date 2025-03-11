import React from 'react';
import SamplePage from 'pages/temp/sample-page';
import { Outlet } from 'react-router-dom';
import Users from 'pages/AdminDashboard/Users';
import { addUserRoutes } from 'pages/AdminDashboard/Users/temp/AddUser';
import AddUser from 'pages/AdminDashboard/Users/AddUser';
import Priviledges from 'pages/AdminDashboard/Priviledges';
import AppointmentStepper from 'pages/AdminDashboard/Appointment/AppointmentStepper';

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
    { path: 'sample-page', element: <SamplePage /> },
    { path: 'shadow', element: <></> },
    {
      path: 'users',

      children: [
        { index: true, element: <Users /> },

        {
          path: 'add-user',
          element: <AddUser />,
        },
        { path: 'edit-user' },
        { path: 'priviledges', element: <Priviledges /> },
      ],
    },
  ],
};
export default adminRoutes;
