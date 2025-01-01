import React from 'react';
import SamplePage from 'pages/temp/sample-page';
import { Outlet } from 'react-router-dom';
import Users from 'pages/AdminDashboard/Users';
import AddUser from 'pages/AdminDashboard/Users/AddUser';
//export router object by createbrowserRouter
const adminRoutes = {
  path: '/admin-dashboard',
  element: <Outlet />,
  children: [
    { index: true, element: <h1>Admin Dashboard</h1> },
    { path: 'sample-page', element: <SamplePage /> },
    { path: 'shadow', element: <AddUser /> },
    {
      path: 'users',
      element: (
        <>
          <Users />
        </>
      ),
      children: [
        {
          path: 'add-user',
          element: (
            <>
              <AddUser />
            </>
          ),
        },
        { path: 'edit-user' },
      ],
    },
  ],
};
export default adminRoutes;
