// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import

import menuItem from 'menu-items';
import NavItem from './NavItem';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  //TODO:Edit the unneccessary switch cases
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'item':
        return <NavItem key={item.id} item={item} level={1} />;
      case 'group':
        return <>Not yet available</>;

      case 'collapse':
        //TODO: Collapse is under development
        return <>Not yet available</>;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2, pr: 1 }}>{navGroups}</Box>;
}
