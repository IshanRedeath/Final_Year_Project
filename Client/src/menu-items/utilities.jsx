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
      url: '/typography',
      icon: icons.FontDownloadOutlinedIcon,
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.WallpaperOutlinedIcon,
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.QrCode2OutlinedIcon,
    },
  ],
};

export default utilities;
