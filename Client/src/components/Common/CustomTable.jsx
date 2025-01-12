import * as React from 'react';
import PropTypes from 'prop-types';
//Mui Components
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
//Mui Icons
import FilterListIcon from '@mui/icons-material/FilterList';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';

// ##############################--Table header components and header functions--##############################

//Top toolbar component
function EnhancedTableToolbar(props) {
  const { numSelected, tableName, toolbarOptions, selected, add } = props;
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
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
            {`${tableName} Table`}
          </Typography>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add ">
            <IconButton onClick={add}>
              <ControlPointTwoToneIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {toolbarOptions?.map((option, id) => {
        if (numSelected > 1 && option.selectedMany) {
          //Handle options functions when more than one row selected
          return (
            <Tooltip key={id} title={option.title}>
              <IconButton onClick={() => option.action(selected)}>{option.icon}</IconButton>
            </Tooltip>
          );
        }
        if (numSelected === 1) {
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

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  tableName: PropTypes.string.isRequired,
  toolbarOptions: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
};
//Table head component
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'lightblue' }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            style={{ minWidth: headCell.width }}
            key={headCell.id}
            align={headCell.align ? headCell.align : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
};
// ############################################################################################################

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,

  tableName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toolbarOptions: PropTypes.array.isRequired,
  add: PropTypes.func,
};

export default function CustomTable(props) {
  const { columns, rows, tableName, id, loading, toolbarOptions, add } = props;
  const [innerloading, setInnerLoading] = React.useState(loading);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  //handle table head's select checkbox click event
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows ? rows.map((n) => n[id]) : []; //The result is a new array containing only the id values of all elements in rows if rows available
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  // Handler row click event
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id); // return the index of the element id in 'selected' array, if it exits, else return -1
    let newSelected = [];

    if (selectedIndex === -1) {
      //if the id is not in the selected array, add it to the array
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      //if the id is the first element in the selected array, remove it from the array
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      //if the id is the last element in the selected array, remove it from the array
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      //if the id is in the middle of the selected array, remove it from the array
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  //handle pagination page change event
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //handle pagination rows per page change event
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0); //reset page number
  };

  //handle dense padding switch change event
  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  //use Memo hook is used avoid the below calculation block from being recomputed by caching the values, if parent component re-rendered  unless dependancy changed
  const visibleRows = React.useMemo(
    () => {
      if (!rows) {
        return undefined;
      }
      return [...rows]
        .sort(getComparator(order, orderBy)) // sort the rows based on order column and orderBy(asc,desc),thenn
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, //return only a chunk(rows per page) for the g from overall 'rows' arrays
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mt: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName={tableName}
          toolbarOptions={toolbarOptions}
          add={add}
          selected={selected}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows ? rows.length : 0}
              columns={columns}
            />
            <TableBody>
              {visibleRows ? (
                visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row[id]); //check if the row is selected
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={row[id]}
                      hover
                      onClick={(event) => handleClick(event, row[id])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>

                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.formatCell ? column.formatCell(row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                //if no visible rows, render a row with a message
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * rowsPerPage,
                  }}
                >
                  <TableCell colSpan={columns.length + 1} align="center">
                    No data to Show
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && ( // if there are empty rows, render them to avoid layout jump
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* If needwed enable the switch dense to enable disable dense padding of rows */}
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
