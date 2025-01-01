// assets

import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
// icons
const icons = {
  GTranslateOutlinedIcon,
  ContactSupportOutlinedIcon,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/admin-dashboard/sample-page',
      icon: icons.GTranslateOutlinedIcon,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/',
      icon: icons.ContactSupportOutlinedIcon,
      external: true,
      target: true,
    },
  ],
};

export default support;
