import PropTypes from 'prop-types';

import { alpha } from '@mui/material/styles';
//mui components
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

//Mui Icons
import FilterListIcon from '@mui/icons-material/FilterList';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import RefreshIcon from '@mui/icons-material/Refresh';

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tableName: PropTypes.string.isRequired,
  toolbarOptions: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired, //selected row's Id
  add: PropTypes.func, //add function to add new row
  setOpenFilterModal: PropTypes.func, //open filter modal function
};

//Top toolbar component
export default function EnhancedTableToolbar(props) {
  const {
    numSelected,
    tableName,
    toolbarOptions,
    selected,
    add,
    setOpenFilterModal,
    handleSearchChange,
    searchQuery,
    refresh,
  } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          //change bgcolor when a row selected
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <>
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
              (Tip: Right click to select a single row)
            </Typography>
          </Typography>{' '}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
            <TextField
              sx={{ width: 250 }}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchSharpIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            {`${tableName} Table`}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
            <TextField
              sx={{ width: 250 }}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchSharpIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <Tooltip title="Filter list">
            <IconButton onClick={setOpenFilterModal}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add ">
            <IconButton onClick={add}>
              <ControlPointTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={refresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {toolbarOptions?.map((option, id) => {
        if (numSelected > 1 && option.selectedMany) {
          //Handle options functions when more than one row selected
          return (
            <Tooltip key={id} title={option.title}>
              <IconButton
                onClick={() => {
                  option.action(selected);
                }}
              >
                {option.icon}
              </IconButton>
            </Tooltip>
          );
        } else if (numSelected === 1) {
          //handle options functions when only one row selected
          return (
            <Tooltip key={id} title={option.title}>
              <IconButton onClick={() => option.action(selected[0])}>{option.icon}</IconButton>
            </Tooltip>
          );
        }
      })}
      {}
    </Toolbar>
  );
}
