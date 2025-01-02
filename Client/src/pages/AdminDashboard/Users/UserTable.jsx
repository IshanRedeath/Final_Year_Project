import { useState, useEffect } from 'react';
//MUiX DataGrid Table Library
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
//MUI Core Componensts
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//Mui Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import CircleIcon from '@mui/icons-material/Circle';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import { apiFetch } from 'api/base';
import { getUsersUsingAxios } from 'api/testAPIs';
import { Tooltip } from '@mui/material';

//Render User Table fields
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
const renderStatusField = (params) => {
  const value = params.row.status;
  let props = {};

  if (value === 'Active') {
    props = { color: 'green' };
  } else if (value === 'Pending') {
    props = { color: 'yellow' };
  } else {
    props = { color: 'red' };
  }

  return (
    <Box display="flex" alignItems="center" width="100%" height="100%" gap={1}>
      <CircleIcon sx={{ ...props, fontSize: 13 }} />
      <Typography fontSize={12}>{value}</Typography>
    </Box>
  );
};
const ITEM_HEIGHT = 48;
const RenderUserActionMenu = (params) => {
  const [anchorEl, setAnchorEl] = useState(null);
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
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '15ch',
            },
          },
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.name}
              onClick={() => {
                option.action(params.row.id);
                handleClose();
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {option.icon}
                {option.name}
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

//User Table Option functions
const handleUserEdit = (id) => {
  console.log('edit ', id);
};
const handleUserDelete = (id) => {
  console.log('delete ', id);
};
const handleUserEmail = (id) => {
  console.log('email ', id);
};
const handleUserView = (id) => {
  console.log('view ', id);
};

//User Table Each row menu Options List
const options = [
  {
    name: 'Delete',
    icon: <DeleteTwoToneIcon />,
    action: (id) => handleUserDelete(id),
    variant: 'contained',
    color: 'error',

    visible: true,
  },

  {
    name: 'Email',
    icon: <EmailTwoToneIcon />,
    action: (id) => handleUserEmail(id),
    variant: 'contained',

    visible: true,
  },
  {
    name: 'Edit',
    icon: <EditTwoToneIcon color="action" />,
    action: (id) => handleUserEdit(id),
    variant: 'outlined',

    visible: false,
  },
  {
    name: 'View',
    icon: <PrintTwoToneIcon color="success" />,
    action: (id) => handleUserView(id),
    variant: 'outlined',
    visible: false,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export default function UserTable() {
  const [rowIds, setRowIds] = useState([]);
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      getUsersUsingAxios('/users', { timeout: 10000 })
        .then((res) => {
          setRows(res.data);
        })
        .catch((err) => {
          console.error('Connection Error ', err);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });

      console.log(rows);
    } catch (e) {
      console.log('Error: ', e);
      setLoading(false);
    }
  }, []);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Grid
        spacing={1}
        container
        justifyContent="flex-start"
        alignItems="center"
        sx={{ height: 45, backgroundColor: 'lightBlue', pl: 1 }}
      >
        {options.map((option) => {
          const len = rowIds.length;

          const visibility = len === 1 || (option.visible && len > 1);
          return (
            <Grid
              key={option.name}
              item
              sx={{
                opacity: visibility ? 1 : 0,
                visibility: visibility ? 'visible' : 'hidden',
                transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
              }}
            >
              <Tooltip title={option.name}>
                <Button variant={option.variant} color={option.color}>
                  {option.icon}
                </Button>
              </Tooltip>
            </Grid>
          );
        })}

        <Grid item sx={{ flexGrow: 1 }}></Grid>
        <Grid item sx={{ mx: 1 }}>
          <Button variant="contained">
            <PersonAddTwoToneIcon sx={{ mr: 2 }} /> Add User
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={50}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          setRowIds(ids);
          console.log(ids);
        }}
        loading={loading}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          loadingOverlay: { variant: 'circular-progress', noRowsVariant: 'skeleton' },
        }}
        slots={{ toolbar: GridToolbar }}
      />
    </Paper>
  );
}
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
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: (params) => renderStatusField(params),
  },
  { field: 'createdAt', headerName: 'Created At', width: 100 },
  { field: 'lastActive', headerName: 'Last Active', width: 100 },
  {
    width: 50,
    renderCell: (params) => RenderUserActionMenu(params),
  },
];
// const rows = [
//   {
//     id: 1,
//     email: 'john.doe@example.com',
//     pictureUrl:
//       'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
//     firstName: 'John',
//     lastName: 'Doe',
//     contactNo: '+1234567890',
//     role: 'Admin',
//     department: 'IT',
//     status: 'Active',
//     createdAt: '2024-01-01T10:00:00Z',
//     lastActive: '2024-12-25T15:45:00Z',
//   },
//   {
//     id: 2,
//     email: 'jane.smith@example.com',
//     pictureUrl: 'https://example.com/images/jane.jpg',
//     firstName: 'Jane',
//     lastName: 'Smith',
//     contactNo: '+1987654321',
//     role: 'Doctor',
//     department: 'Pediatrics',
//     status: 'Inactive',
//     createdAt: '2023-06-15T09:30:00Z',
//     lastActive: '2024-06-12T14:20:00Z',
//   },
//   {
//     id: 3,
//     email: 'alex.jones@example.com',
//     pictureUrl: 'https://example.com/images/alex.jpg',
//     firstName: 'Alex',
//     lastName: 'Jones',
//     contactNo: '+1122334455',
//     role: 'Nurse',
//     department: 'Emergency',
//     status: 'Active',
//     createdAt: '2023-12-01T08:15:00Z',
//     lastActive: '2024-12-20T10:00:00Z',
//   },
//   {
//     id: 4,
//     email: 'chris.lee@example.com',
//     pictureUrl: 'https://example.com/images/chris.jpg',
//     firstName: 'Chris',
//     lastName: 'Lee',
//     contactNo: '+1223344556',
//     role: 'Lab Technician',
//     department: 'Laboratory',
//     status: 'Active',
//     createdAt: '2022-11-20T11:45:00Z',
//     lastActive: '2024-11-30T16:30:00Z',
//   },
//   {
//     id: 5,
//     email: 'maria.garcia@example.com',
//     pictureUrl: 'https://example.com/images/maria.jpg',
//     firstName: 'Maria',
//     lastName: 'Garcia',
//     contactNo: '+1445566778',
//     role: 'Receptionist',
//     department: 'Front Desk',
//     status: 'Inactive',
//     createdAt: '2021-05-05T07:00:00Z',
//     lastActive: '2023-10-25T12:00:00Z',
//   },
// ];
