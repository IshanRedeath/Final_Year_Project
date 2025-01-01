// assets

import FontDownloadOutlinedIcon from '@mui/icons-material/FontDownloadOutlined';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
// icons
const icons = {
  FontDownloadOutlinedIcon,
  WallpaperOutlinedIcon,
  QrCode2OutlinedIcon,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/admin-dashboard/typography',
      icon: icons.FontDownloadOutlinedIcon,
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/admin-dashboard/color',
      icon: icons.WallpaperOutlinedIcon,
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/admin-dashboard/shadow',
      icon: icons.QrCode2OutlinedIcon,
    },
  ],
};

export default utilities;
