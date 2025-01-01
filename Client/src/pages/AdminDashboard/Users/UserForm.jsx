import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Autocomplete, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
const roles = ['Admin', 'receptionist', 'labrotary', 'Viewer', 'Doctor', 'Nurse', 'Pharmacist', 'Manager'];

const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

export default function UserForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form Submitted:', formData);
  };

  return (
    <Box sx={{ mx: 'auto', mb: 10 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => option.name}
              value={formData.employee}
              onChange={(e, value) => handleChange('employee', value)}
              renderInput={(params) => <TextField {...params} label="Select Employee" />}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </Grid>

          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Grid>

          {/* Row 3 */}
          <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 8, lg: 6 }}>
            <Typography variant="subtitle1">Roles</Typography>
            <Grid container>
              {roles.map((role) => (
                <Grid item xs={6} key={role}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role)}
                      />
                    }
                    label={role}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item size={{ xs: 12 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
