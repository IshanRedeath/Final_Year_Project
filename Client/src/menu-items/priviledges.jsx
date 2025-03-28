// mui icon
import VpnKeyOffTwoToneIcon from '@mui/icons-material/VpnKeyOffTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import SecurityIcon from '@mui/icons-material/Security';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
// icons
const icons = {
  VpnKeyOffTwoToneIcon,
  SecurityIcon,
  EnhancedEncryptionIcon,
  EditNoteTwoToneIcon,
};

// ==============================|| MENU ITEMS - User||============================== //

const priviledge = {
  id: 'priviledge',
  title: 'Priviledge Management',
  type: 'item',
  url: '/admin-dashboard/priviledges',
  icon: icons.SecurityIcon,
  children: [
    {
      id: 'priviledges',
      title: 'Priviledges',
      type: 'item',
      url: '/admin-dashboard/priviledges',
      icon: icons.SecurityIcon,
    },

    {
      id: 'addPriviledge',
      title: 'Add',
      type: 'item',
      url: '/admin-dashboard/priviledges/add',
      icon: icons.EnhancedEncryptionIcon,
    },
    {
      id: 'editPriviledge',
      title: 'Edit',
      type: 'item',
      url: '/admin-dashboard/priviledges/edit',
      icon: icons.EditNoteTwoToneIcon,
    },
  ],
};

export default priviledge;
