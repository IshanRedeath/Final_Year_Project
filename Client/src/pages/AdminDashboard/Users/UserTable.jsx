import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const renderUserNameField = (params) => (
  <Grid container alignItems="center" spacing={2} style={{ maxWidth: 300 }}>
    <Grid item>
      <Avatar
        src={params.row.pictureUrl}
        alt={`${params.row.firstName} ${params.row.lastName}`}
        sx={{ width: 40, height: 40 }}
      />
    </Grid>

    {/* Full Name and Email */}
    <Grid item xs>
      <Grid container direction="column" alignItems="flex-start">
        <Typography variant="body1" fontWeight="bold">
          {`${params.row.firstName} ${params.row.lastName}`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {params.row.email}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);
const RenderUserModifyMenu = (params) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {' '}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
    </>
  );
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },

  {
    field: 'profile',
    headerName: 'Profile',
    width: 300,
    renderCell: (params) => renderUserNameField(params),
  },
  { field: 'contactNo', headerName: 'Contact', width: 130 },
  { field: 'role', headerName: 'Access', width: 130 },
  { field: 'department', headerName: 'Department', width: 90 },
  { field: 'status', headerName: 'Status', width: 70 },
  { field: 'createdAt', headerName: 'Created At', width: 80 },
  { field: 'lastActive', headerName: 'Last Active', width: 80 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 50,
    renderCell: (params) => RenderUserModifyMenu(params),
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 10, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 11, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 12, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 13, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const paginationModel = { page: 0, pageSize: 10 };

export default function UserTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          console.log(ids);
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

const rows = [
  {
    id: 1,
    email: 'john.doe@example.com',
    pictureUrl:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    firstName: 'John',
    lastName: 'Doe',
    contactNo: '+1234567890',
    role: 'Admin',
    department: 'IT',
    status: 'Active',
    createdAt: '2024-01-01T10:00:00Z',
    lastActive: '2024-12-25T15:45:00Z',
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    pictureUrl: 'https://example.com/images/jane.jpg',
    firstName: 'Jane',
    lastName: 'Smith',
    contactNo: '+1987654321',
    role: 'Doctor',
    department: 'Pediatrics',
    status: 'Inactive',
    createdAt: '2023-06-15T09:30:00Z',
    lastActive: '2024-06-12T14:20:00Z',
  },
  {
    id: 3,
    email: 'alex.jones@example.com',
    pictureUrl: 'https://example.com/images/alex.jpg',
    firstName: 'Alex',
    lastName: 'Jones',
    contactNo: '+1122334455',
    role: 'Nurse',
    department: 'Emergency',
    status: 'Active',
    createdAt: '2023-12-01T08:15:00Z',
    lastActive: '2024-12-20T10:00:00Z',
  },
  {
    id: 4,
    email: 'chris.lee@example.com',
    pictureUrl: 'https://example.com/images/chris.jpg',
    firstName: 'Chris',
    lastName: 'Lee',
    contactNo: '+1223344556',
    role: 'Lab Technician',
    department: 'Laboratory',
    status: 'Active',
    createdAt: '2022-11-20T11:45:00Z',
    lastActive: '2024-11-30T16:30:00Z',
  },
  {
    id: 5,
    email: 'maria.garcia@example.com',
    pictureUrl: 'https://example.com/images/maria.jpg',
    firstName: 'Maria',
    lastName: 'Garcia',
    contactNo: '+1445566778',
    role: 'Receptionist',
    department: 'Front Desk',
    status: 'Inactive',
    createdAt: '2021-05-05T07:00:00Z',
    lastActive: '2023-10-25T12:00:00Z',
  },
];
