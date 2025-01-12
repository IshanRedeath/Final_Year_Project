import React from 'react';
//MUi componenents
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// project import
import { useMenu } from 'context/dashboardMenuContext';
import menuItem from 'menu-items';
import { useLocation } from 'react-router-dom';
import NavItems from './NavItems';

export default function Navigation() {
  const { menuState } = useMenu();

  const openItem = menuState.openedItem;

  const { pathname } = useLocation();

  // Split the pathname into segments
  const segments = pathname.split('/').filter(Boolean);
  // Join the first two segments to form url
  const firstTwoPaths = `/${segments.slice(0, 2).join('/')}`;
  // Join the first three segments
  const firstThreePaths = `/${segments.slice(0, 3).join('/')}`;

  const item = menuItem.items.filter((item) => item.id === openItem && item.url === firstTwoPaths)[0];
  if (item === undefined || item === null) return <div>No submenus defined for this page yet</div>;

  const navItems = item.children.map((item) => {
    switch (item.type) {
      case 'item':
        return <NavItems key={item.id} item={item} url={firstThreePaths} />;
      case 'collapse':
        return <>Group</>;
      default:
        return <></>;
    }
  });

  return (
    <div>
      {' '}
      <Box
        display="flex"
        sx={{
          width: '100%',
          typography: 'body1',
          ml: 1.65,
          mr: 2,
          px: 2,
          borderLeft: '1px solid #e0e0e0',
          borderRight: '1px solid #e0e0e0 ',
        }}
      >
        {navItems}
      </Box>
    </div>
  );
}
