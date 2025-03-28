// assets

import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import VpnKeyOffTwoToneIcon from '@mui/icons-material/VpnKeyOffTwoTone';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
// icons
const icons = {
  PeopleAltTwoToneIcon,
  VpnKeyOffTwoToneIcon,
  PersonAddTwoToneIcon,
  EditNoteTwoToneIcon,
};

// ==============================|| MENU ITEMS - User||============================== //

const user = {
  id: 'user',
  title: 'User Management',
  type: 'item',
  url: '/admin-dashboard/users',
  icon: icons.PeopleAltTwoToneIcon,
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/admin-dashboard/users',
      icon: icons.PeopleAltTwoToneIcon,
    },
    // {
    //   id: 'priviledges',
    //   title: 'Priviledges',
    //   type: 'item',
    //   url: '/admin-dashboard/users/priviledges',
    //   icon: icons.VpnKeyOffTwoToneIcon,
    // },
    {
      id: 'adduser',
      title: 'Add User',
      type: 'item',
      url: '/admin-dashboard/users/add',
      icon: icons.PersonAddTwoToneIcon,
    },
    {
      id: 'edituser',
      title: 'Edit User',
      type: 'item',
      url: '/admin-dashboard/users/edit',
      icon: icons.EditNoteTwoToneIcon,
    },
  ],
};

export default user;
