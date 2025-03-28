import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const icons = {
  docIcon: PersonAddTwoToneIcon,
  addIcon: AddCircleTwoToneIcon,
};

const doctors = {
  id: 'doctors',
  title: 'Doctor Management',
  type: 'item',
  url: '/admin-dashboard/doctors',
  icon: icons.docIcon,
  children: [
    {
      id: 'doctors',
      title: 'Doctors',
      type: 'item',
      url: '/admin-dashboard/doctors',
      icon: icons.docIcon,
    },
    {
      id: 'addDoctor',
      title: 'Add Doctor',
      type: 'item',
      url: '/admin-dashboard/doctors/add',
      icon: icons.addIcon,
    },
  ],
};

export default doctors;
