import { useState } from 'react';

//MUI Core Componensts

import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//Mui Icons

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import CircleIcon from '@mui/icons-material/Circle';

//API
import { deleteUser, getUsers, getOneUser, getUserView } from 'api/userAPIs';

//project imports
import FormModal from 'components/Common/FormModal';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import CustomTable from 'components/Common/CustomTable';

//User Table Option functions

export default function UserTable() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateUserId, setUpdateUserId] = useState({});

  const handleUserEmail = (id) => {
    window.location.href = `mailto:user${id}@localhost?subject=Hello&body=This is a test email`;
  };

  const handleUserEdit = (id) => {
    setUpdateUserId(id);
    setOpenUpdateModal(true);
  };
  //User Table Each row menu Additional Options List
  const options = [
    {
      title: 'Email',
      icon: <EmailTwoToneIcon color="primary" />,
      action: (id) => handleUserEmail(id),
      selectedMany: true,
    },
  ];

  return (
    <>
      <FormModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
        }}
        title="Add User"
      >
        <AddUser />
      </FormModal>
      <FormModal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} title="Update User">
        <UpdateUser Id={updateUserId} />
      </FormModal>
      <CustomTable
        add="/admin-dashboard/users/add"
        //edit="/admin-dashboard/users/edit"
        edit={handleUserEdit}
        options={options}
        get={getUsers}
        del={deleteUser}
        view={getUserView}
        columns={columns}
        tableName="User"
        // id="_id" //optional
      />
    </>
  );
}

const columns = [
  {
    id: 'userId',
    label: 'ID',
    width: 70,
    formatCell: (params) => params.user.id,
  },

  {
    delete: true,
    id: 'username',
    label: 'Profile',
    width: 300,
    formatCell: (params) => renderUserNameField(params),
  },

  {
    id: 'roles',
    isFilterable: true,
    label: 'Access Roles',
    width: 150,
    formatCell: (params) => renderRolesField(params),
  },

  {
    id: 'status',
    label: 'Status',
    isFilterable: true,
    width: 100,
    formatCell: (params) => renderStatusField(params),
  },
  { id: 'createdAt', label: 'Created At', width: 100, isFilterable: true },
  { id: 'lastLogin', label: 'Last Active', width: 100, isFilterable: true },
];

//Render User Table fields
const renderUserNameField = (row) => (
  <Grid container alignItems="center" spacing={2} style={{ maxWidth: 300 }}>
    <Grid>
      <Avatar src={row.pictureUrl} alt={row.username} sx={{ width: 40, height: 40 }} />
    </Grid>

    {/* Full Name and Email */}
    <Grid>
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
