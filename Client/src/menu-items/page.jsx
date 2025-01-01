// assets

import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
// icons
const icons = {
  LoginOutlinedIcon,
  HowToRegOutlinedIcon,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/admin-dashboard/login',
      icon: icons.LoginOutlinedIcon,
      target: false,
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/admin-dashboard/register',
      icon: icons.HowToRegOutlinedIcon,
      target: true,
    },
  ],
};

export default pages;
