import React from 'react';
import { Outlet } from 'react-router-dom';

//export router object by createbrowserRouter
const doctorRoutes = {
  path: 'doctor-dashboard',
  element: (
    <>
      <h1>Doctor Dashboard</h1>
      <Outlet />
    </>
  ),
};
export default doctorRoutes;
