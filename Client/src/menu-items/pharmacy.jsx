import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
// icons
const icons = {
  EventAvailableTwoToneIcon,
  PendingActionsTwoToneIcon,
};

// ==============================|| MENU ITEMS - Appointments ||============================== //

const pharmacy = {
  id: 'pharmacy',
  title: 'Pharmacy',
  type: 'item',
  url: '/admin-dashboard/pharmacy',
  icon: icons.EventAvailableTwoToneIcon,
  children: [
    {
      id: 'appointments',
      title: 'Appointments',
      type: 'item',
      url: '/admin-dashboard/appointments',
      icon: icons.EventAvailableTwoToneIcon,
    },
    {
      id: 'calendar',
      title: 'Calendar',
      type: 'item',
      url: '/admin-dashboard/appointments/calendar',
      icon: icons.PendingActionsTwoToneIcon,
    },
  ],
};

export default pharmacy;
