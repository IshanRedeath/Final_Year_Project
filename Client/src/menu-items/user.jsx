// assets

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VpnKeyOffOutlinedIcon from '@mui/icons-material/VpnKeyOffOutlined';
// icons
const icons = {
  PeopleAltOutlinedIcon,
  VpnKeyOffOutlinedIcon,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const user = {
  id: 'user',
  title: 'User Management',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/admin-dashboard/users',
      icon: icons.PeopleAltOutlinedIcon,
    },
    {
      id: 'priviledges',
      title: 'Assign priviledges',
      type: 'item',
      url: '/admin-dashboard/priviledges',
      icon: icons.VpnKeyOffOutlinedIcon,
    },
  ],
};

export default user;
