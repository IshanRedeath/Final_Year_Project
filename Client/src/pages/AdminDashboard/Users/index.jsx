import React from 'react';
import UserTable from './UserTable';
import { Outlet } from 'react-router-dom';
export default function Users() {
  return (
    <div>
      <h3 style={{ margin: 0 }}>User Management</h3>
      <p style={{ marginTop: 0, marginBottom: 6 }}>Manage your working team and their account permission.</p>
      <Outlet />
      <UserTable />
    </div>
  );
}
