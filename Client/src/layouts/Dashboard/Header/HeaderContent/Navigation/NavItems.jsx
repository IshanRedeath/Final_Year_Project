import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useMenu } from 'context/dashboardMenuContext';
import { Link, matchPath, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
export default function NavItems({ item, url }) {
  const theme = useTheme();
  const { menuState, handlerActiveItem2 } = useMenu();
  const openItem = menuState.openedItem2;
  const [value, setValue] = useState('1');
  const isSelected = !!matchPath({ path: item.url }, url) || openItem === item.id;
  const { pathname } = useLocation();
  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = {
    // eslint-disable-next-line react/display-name
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />),
    //TODO: to={`/admin-dashboard${item.url}`} as GLOBAL user role assignment
  };
  useEffect(() => {
    if (url === item.url) {
      handlerActiveItem2(item.id);
    }
  }, [pathname]);
  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon /> : false;

  return (
    <>
      {' '}
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        onClick={() => handlerActiveItem2(item.id)}
        selected={isSelected}
        sx={{
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
          },
        }}
      >
        <ListItemIcon sx={{ color: isSelected ? iconSelectedColor : textColor, p: 0, mr: -3 }}>
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor, mr: -1 }}>
              {item.title}
            </Typography>
          }
        />
        {/* {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>} */}
      </ListItemButton>
    </>
  );
}
NavItems.propTypes = { item: PropTypes.object, level: PropTypes.number };
