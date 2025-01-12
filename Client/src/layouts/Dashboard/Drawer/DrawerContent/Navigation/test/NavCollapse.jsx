import PropTypes from 'prop-types';
import React from 'react';
//Mui Components
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
//mui Icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// project import
import NavItem from './NavItem';
import { useMenu } from 'context/dashboardMenuContext';
import IconButton from '@mui/material/IconButton';

export default function NavCollapse({ item }) {
  const { menuState } = useMenu();
  const drawerOpen = menuState.isDashboardDrawerOpened;
  const [open, setOpen] = React.useState(drawerOpen);
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={item} level={2} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });
  const handleCollapse = () => {
    setOpen(!open);
  };
  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <>
            <Button
              onClick={handleCollapse}
              fullWidth
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 3 }}
            >
              <Typography variant="h6" color="textPrimary">
                {item.title}
              </Typography>

              {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
            </Button>
          </>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      <Collapse in={open} timeout="auto">
        {navCollapse}
      </Collapse>
    </List>
  );
}

NavCollapse.propTypes = { item: PropTypes.object };
