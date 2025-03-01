import { useState, useEffect } from 'react';

//MUI Core Componensts

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

//APi
import { apiFetch } from 'api/base';
import { deleteUser, updateUser, getUsers, getOneUser } from 'api/userAPIs';
import { Tooltip } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

//project imports
import CustomTable from 'components/Common/CustomTable';
import FormModal from 'components/Common/FormModal';
import AddUser from './AddUser';
import UserForm from './UserForm';
import UpdateUser from './UpdateUser';

//User Table Option functions

export default function UserTable() {
  const [rowIds, setRowIds] = useState([]);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [canClose, setCanClose] = useState(true);
  const [updateUserId, setUpdateUserId] = useState({});
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpenAddModal(true);
  };
  const handleUserEdit = (id) => {
    setUpdateUserId(id);
    setOpenUpdateModal(true);
  };
  const handleUserDelete = (id) => {
    try {
      deleteUser(id)
        .then((res) => {
          console.log('User Deleted', res);
        })
        .catch((err) => {
          console.error('Connection Error ', err);
        });
    } catch (e) {
      console.log('Error: ', e);
    }
  };
  const handleUserEmail = (id) => {
    window.location.href = `mailto:user${id}@localhost?subject=Hello&body=This is a test email`;
  };

  const handleUserView = (id) => {
    console.log('view ', id);
  };

  const handleCloseAddModal = () => {
    if (canClose) {
      setOpenAddModal(false);
    } else {
      if (window.confirm('Are you sure you want to close the form?')) {
        setOpenAddModal(false);
      }
    }
    setCanClose(true);
  };
  const handleCloseUpdateModal = () => {
    if (canClose) {
      setOpenUpdateModal(false);
    } else {
      if (window.confirm('Are you sure you want to close the form?')) {
        setOpenUpdateModal(false);
      }
    }
    setCanClose(true);
  };
  // const handleFormState = (state) => {
  //   setFormState(state);
  // };

  useEffect(() => {
    console.log('data is fetching....');
    try {
      setLoading(true);
      getUsers()
        .then((res) => {
          const data = res.data.data.users;

          setRows(data);
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
  //User Table Each row menu Options List
  const options = [
    {
      title: 'Delete',
      icon: <DeleteTwoToneIcon color="error" />,
      action: (id) => handleUserDelete(id),

      selectedMany: true,
      visible: true,
    },

    {
      title: 'Email',
      icon: <EmailTwoToneIcon color="primary" />,
      action: (id) => handleUserEmail(id),
      selectedMany: true,
      visible: true,
    },
    {
      title: 'Edit',
      icon: <EditTwoToneIcon color="action" />,
      action: (id, data) => handleUserEdit(id, data),
      selectedMany: false,
      visible: false,
    },
    {
      title: 'View',
      icon: <PrintTwoToneIcon color="info" />,
      action: (id) => handleUserView(id),
      selectedMany: false,
      visible: false,
    },
  ];

  return (
    <>
      <FormModal open={openAddModal} onClose={handleCloseAddModal} title="Add User">
        {/* <UserForm setCanClose={setCanClose} /> */}
        <AddUser />
      </FormModal>
      <FormModal open={openUpdateModal} onClose={handleCloseUpdateModal} title="Update User">
        <UpdateUser id={updateUserId} />
      </FormModal>
      <CustomTable
        // loading={loading}
        add={handleClickOpen}
        // add={() => navigate('/admin-dashboard/users/add-user')}
        toolbarOptions={options}
        rows={rows}
        columns={columns}
        tableName="User"
        id="userId"
      />
    </>
  );
}

const columns = [
  { id: 'userId', label: 'ID', width: 70 },

  {
    id: 'profile',
    label: 'Profile',
    width: 300,
    formatCell: (params) => renderUserNameField(params),
  },

  {
    id: 'roles',
    label: 'Access Roles',
    width: 150,
    formatCell: (params) => renderRolesField(params),
  },

  {
    id: 'status',
    label: 'Status',
    width: 100,
    formatCell: (params) => renderStatusField(params),
  },
  { id: 'createdAt', label: 'Created At', width: 100 },
  { id: 'lastLogin', label: 'Last Active', width: 100 },
];

//Render User Table fields
const renderUserNameField = (row) => (
  <Grid container alignItems="center" spacing={2} style={{ maxWidth: 300 }}>
    <Grid item>
      <Avatar src={row.pictureUrl} alt={row.username} sx={{ width: 40, height: 40 }} />
    </Grid>

    {/* Full Name and Email */}
    <Grid item>
      <Grid container direction="column" alignItems="flex-start">
        <Typography variant="body1" fontWeight="bold">
          {row.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {row.email}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);
const renderStatusField = (row) => {
  const value = row.status;
  let props = {};

  if (value === 'active') {
    props = { color: 'green' };
  } else if (value === 'pending') {
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

const renderRolesField = (row) => {
  const roles = row.roles;
  return (
    <Box display="flex" alignItems="center" sx={{ height: '50px' }} gap={1}>
      {roles.map((role) => (
        <Typography
          key={role}
          variant="body2"
          sx={{
            backgroundColor: 'primary.light',
            color: 'white',
            borderRadius: 2,
            px: 1,
          }}
        >
          {role}
        </Typography>
      ))}
    </Box>
  );
};
//const ITEM_HEIGHT = 48;
// const RenderUserActionMenu = (params) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       {' '}
//       <IconButton
//         aria-label="more"
//         id="long-button"
//         aria-controls={open ? 'long-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         <MoreVertIcon />
//       </IconButton>
//       <Menu
//         id="long-menu"
//         MenuListProps={{
//           'aria-labelledby': 'long-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         slotProps={{
//           paper: {
//             style: {
//               maxHeight: ITEM_HEIGHT * 4.5,
//               width: '15ch',
//             },
//           },
//         }}
//       >
//         {options.map((option) => {
//           return (
//             <MenuItem
//               key={option.name}
//               onClick={() => {
//                 option.action(params.row.id);
//                 handleClose();
//               }}
//             >
//               <Box display="flex" alignItems="center" gap={1}>
//                 {option.icon}
//                 {option.name}
//               </Box>
//             </MenuItem>
//           );
//         })}
//       </Menu>
//     </>
//   );
// };
