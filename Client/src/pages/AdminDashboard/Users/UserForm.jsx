import PropTypes from 'prop-types';
import React, { useState } from 'react';
// MUI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Form } from 'react-router-dom';

const roles = ['Admin', 'receptionist', 'labrotary', 'Viewer', 'Doctor', 'Nurse', 'Pharmacist', 'Manager'];

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

UserForm.propTypes = {
  errors: PropTypes.object,
  submitType: PropTypes.string,
  setCanClose: PropTypes.func,
};

export default function UserForm(props) {
  const { errors = [], submitType, setCanClose } = props;
  const [formData, setFormData] = useState({
    employee: null,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedRoles: [],
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // if (
    //   formData.employee ||
    //   formData.username ||
    //   formData.email ||
    //   formData.password ||
    //   formData.confirmPassword
    // ) {
    //   console.log('Can close false');
    //   setCanClose(false);
    // } else {
    //   console.log('Can close ');
    //   setCanClose(true);
    // }
    // Check if any fields have data
    const hasUnsavedData = value.trim() !== '';
    setCanClose(!hasUnsavedData);
  };

  const handleCheckboxChange = (role) => {
    setFormData((prevState) => {
      const isChecked = prevState.selectedRoles.includes(role);
      const updatedRoles = isChecked
        ? prevState.selectedRoles.filter((r) => r !== role)
        : [...prevState.selectedRoles, role];
      return { ...prevState, selectedRoles: updatedRoles };
    });
  };

  return (
    <Box component={Form} method="post" id="userForm" sx={{ mx: 'auto', mb: 10 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add User
      </Typography>

      <Grid container spacing={2}>
        <Grid container item spacing={2} size={{ xs: 12, sm: 6, md: 12 }}>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <Autocomplete
              size="small"
              options={employees}
              getOptionLabel={(option) => option.name}
              value={formData.employee}
              onChange={(e, value) => handleChange('employee', value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Employee"
                  error={!!errors.employee}
                  helperText={errors.employee}
                  name="employee" // Make sure 'name' attribute is present
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              size="small"
              fullWidth
              name="username" // Make sure 'name' attribute is present
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Email Address"
              type="email"
              name="email" // Make sure 'name' attribute is present
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              name="password" // Make sure 'name' attribute is present
              size="small"
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>

          {/* Row 3 */}
          <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword" // Make sure 'name' attribute is present
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={2} size={{ xs: 12, sm: 6, md: 6 }}>
          <Grid item size={{ xs: 12 }}>
            <Typography variant="subtitle1">Roles</Typography>
            <Grid container>
              {roles.map((role) => (
                <Grid item size={{ xs: 6 }} key={role}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role)}
                        name="roles"
                      />
                    }
                    label={role}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* Submit Button */}
        <Grid item size={{ xs: 12 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
