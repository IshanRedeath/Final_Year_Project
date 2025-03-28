import * as React from 'react';
import PropTypes from 'prop-types';
//react router
import { useNavigate } from 'react-router-dom';
//Mui Components
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
//Mui Icons
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
//project imports
import UseAPI from 'hooks/useAPI';
import { customAlert } from 'components/Common/CustomAlert';
//Component
import EnhancedTableToolbar from './EnhancedTableToolBar';
import EnhancedTableHead from './EnhancedTableHead';
import FilterOptionsModal from './FilterOptionsModal';
import PrintViewModal from './PrintViewModal';

// ##############################--Table header components and header functions--##############################

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
  columns: PropTypes.array.isRequired, //columns to be displayed in the table
  tableName: PropTypes.string.isRequired, //name of the table
  id: PropTypes.string, //id of the row to be used as a unique key(Optional)
  options: PropTypes.array, //options to be displayed in the toolbar(Optional)
  add: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired, // add function or add route path to add new data
  edit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired, // edit function or edit route path to edit data
  del: PropTypes.func.isRequired, //function to delete data
  get: PropTypes.func.isRequired, //function to get data
  view: PropTypes.func, //function to view data
};

export default function CustomTable(props) {
  const {
    columns,
    tableName,
    options = [],
    add,
    edit,
    del,
    get,
    view,
    id = '_id',
    //  deleteFieldName = '_id',
  } = props;

  const [rows, setRows] = React.useState(null);
  const [openFilterModal, setOpenFilterModal] = React.useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [viewData, setViewData] = React.useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [count, setCount] = React.useState(0);
  const deleteFieldName = columns.find((column) => column.delete === true)?.id || '_id';
  const defautOptions = [
    {
      title: 'Delete',
      icon: <DeleteTwoToneIcon color="error" />,
      action: (id) => handleDelete(id, deleteFieldName, rows.find((row) => row._id === id)[deleteFieldName]),
      selectedMany: false,
    },

    {
      title: 'Edit',
      icon: <EditTwoToneIcon color="action" />,
      action: (id) => handleEdit(id),
      selectedMany: false,
    },
    {
      title: 'View',
      icon: <PrintTwoToneIcon color="info" />,
      action: (id) => handleView(id),
      selectedMany: true,
    },
  ];
  const navigate = useNavigate();
  const { fetchData, deleteData } = UseAPI();

  React.useEffect(() => {
    const fetchArray = [{ function: get, setFunction: setRows }];
    get ? fetchData(fetchArray) : null;
  }, [count]);
  const toolbarOptions = [...defautOptions, ...options];
  const handleRefresh = () => {
    setCount(count + 1);
  };
  const handleFilterOpen = () => {
    setOpenFilterModal(true);
  };
  const handleFilterClose = () => {
    setOpenFilterModal(false);
  };
  const handleViewOpen = () => {
    setOpenViewModal(true);
  };
  const handleViewClose = () => {
    setOpenViewModal(false);
  };
  const handleDelete = (id, name, value) => {
    new Promise((resolve, reject) => {
      customAlert(resolve, reject, {
        title: 'Are you sure you want to delete this user?',
        message: `${name}: ${value}`,
      });
    })
      .then(() => {
        deleteData(del, id);
      })
      .then(() => {
        handleRefresh();
        setSelected([]);
      })
      .catch(() => console.log('User did not agree'));
  };
  const handleEdit = (id) => (typeof edit === 'string' ? navigate(`${edit}/${id}`) : edit(id));
  const handleAdd = () => (typeof add === 'string' ? navigate(add) : add);
  const handleView = (id) => {
    const url = `id=${id}`;

    const fetchArray = [{ function: () => view(url), setFunction: setViewData }];
    fetchData(fetchArray);
    handleViewOpen();
  };

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
      console.log(newSelected);
      return;
    }
    setSelected([]);
  };
  // Handler row click event
  const handleClick = (id) => {
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
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

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
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((row) => JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase()));
    }, //return only a chunk(rows per page) for the g from overall 'rows' arrays
    [order, orderBy, page, rowsPerPage, rows, searchQuery],
  );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mt: 2 }}>
        <PrintViewModal
          key={JSON.stringify(viewData)}
          name={tableName}
          data={viewData}
          open={openViewModal}
          onclose={handleViewClose}
        />
        <FilterOptionsModal
          getDataFunc={get}
          columns={columns}
          setRows={setRows}
          open={openFilterModal}
          onclose={handleFilterClose}
        />
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName={tableName}
          toolbarOptions={toolbarOptions}
          add={handleAdd}
          selected={selected}
          setOpenFilterModal={handleFilterOpen}
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          refresh={handleRefresh}
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
            <TableBody
            // onContextMenu={(event) => {
            //   event.preventDefault();
            //   setSelected([]);
            // }}
            >
              {visibleRows ? (
                visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row[id]); //check if the row is selected
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => handleClick(row[id])}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setSelected([row[id]]);
                      }}
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
                //===================================================
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
                //=====================================================
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
