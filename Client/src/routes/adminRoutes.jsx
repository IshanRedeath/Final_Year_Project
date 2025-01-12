import React from 'react';
import SamplePage from 'pages/temp/sample-page';
import { Outlet } from 'react-router-dom';
import Users from 'pages/AdminDashboard/Users';
import { addUserRoutes } from 'pages/AdminDashboard/Users/AddUser';

//export router object by createbrowserRouter
const adminRoutes = {
  path: '/admin-dashboard',
  element: <Outlet />,
  children: [
    { index: true, element: <h1>Admin Dashboard</h1> },
    {
      path: 'appointments',
      children: [
        { index: true, element: <h1>Appointments</h1> },
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
          ...addUserRoutes,
        },
        { path: 'edit-user' },
        { path: 'priviledges', element: <h1>Priviledges</h1> },
      ],
    },
  ],
};
export default adminRoutes;
