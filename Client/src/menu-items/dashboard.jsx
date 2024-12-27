// assets
//import { DashboardOutlined } from '@ant-design/icons';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
// icons
const icons = {
  SpeedOutlinedIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.SpeedOutlinedIcon,
      // breadcrumbs: false,
    },
  ],
};

export default dashboard;
