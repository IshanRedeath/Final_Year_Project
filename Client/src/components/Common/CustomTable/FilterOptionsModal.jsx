import React from 'react';
import PropTypes from 'prop-types';
//mui components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

//project imports
import FormModal from '../FormModal';
import UseAPI from 'hooks/UseAPI';

FilterOptionsModal.propTypes = {
  getDataFunc: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function FilterOptionsModal(props) {
  const { getDataFunc, columns, setRows, open, onclose } = props;
  const [operator, setOperator] = React.useState({});
  const [values, setValues] = React.useState({});
  const handleChangeToggleButton = (event, nextOp, columnId) => {
    setOperator((prev) => ({ ...prev, [columnId]: nextOp }));
  };
  const handleChangeTextField = (event, columnId) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [columnId]: value }));
  };

  const { fetchData } = UseAPI();
  console.log(values);
  const handleReset = () => {
    setValues({});
    setOperator({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = [];
    Object.entries(values).forEach(([key, value]) => {
      const getOperator = (op) => {
        switch (op) {
          case '<':
            return '[lt]';
          case '<=':
            return '[lte]';
          case '>':
            return '[gt]';
          case '>=':
            return '[gte]';
          default:
            return '';
        }
      };
      if (value) {
        const newOperator = getOperator(operator[key]);
        const queryString = `${key}${newOperator}=${value}`;
        filters.push(queryString);
      }
    });
    const query = filters.join('&');
    const fetchArray = [{ function: () => getDataFunc(query), setFunction: setRows }];
    fetchData(fetchArray);
    onclose();
  };

  return (
    <div>
      <Box>
        <FormModal open={open} onClose={onclose} title="Filter Options">
          {columns.some((column) => column.isFilterable) ? (
            <Box component="form" sx={{ width: { xs: 450, sm: 600, md: 720 }, p: 2 }}>
              {' '}
              <Grid container spacing={2}>
                {columns.map((column, index) => {
                  if (column.isFilterable)
                    return (
                      <Grid container spacing={2} key={index} sx={{ width: { xs: 430, sm: 580, md: 700 } }}>
                        <Grid size={{ xs: 2, sm: 2, md: 2 }}>
                          <Typography variant="h6">{column.label}</Typography>
                        </Grid>
                        <Grid size={{ xs: 5, sm: 5, md: 5 }}>
                          <ToggleButtonGroup
                            orientation="horizontal"
                            value={operator[column.id] || '='} //
                            exclusive
                            onChange={(event, nextOp) => handleChangeToggleButton(event, nextOp, column.id)}
                          >
                            <ToggleButton value="<" aria-label="lessThan">
                              {'<'}
                            </ToggleButton>
                            <ToggleButton value="=" aria-label="equals">
                              {'='}
                            </ToggleButton>
                            <ToggleButton value=">" aria-label="greaterThan">
                              {'>'}
                            </ToggleButton>
                            <ToggleButton value="<=" aria-label="lessThanEquals">
                              {'<='}
                            </ToggleButton>
                            <ToggleButton value=">=" aria-label="greaterThanEquals">
                              {'>='}
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Grid>
                        <Grid size={{ xs: 5, sm: 5, md: 5 }} key={column.id}>
                          <TextField
                            id={column.id}
                            type="text"
                            variant="outlined"
                            fullWidth
                            value={values[column.id] || ''}
                            onChange={(event) => handleChangeTextField(event, column.id)}
                          />
                        </Grid>
                      </Grid>
                    );
                })}
              </Grid>{' '}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 4 }}>
                <Button onClick={handleReset}>Reset</Button>
                <Button type="submit" variant="contained" onClick={(e) => handleSubmit(e)}>
                  Apply
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h6">No filterable columns</Typography>
              <Button variant="contained" onClick={onclose} sx={{ mt: 2 }}>
                Go Back
              </Button>
            </Box>
          )}
        </FormModal>
      </Box>
    </div>
  );
}
