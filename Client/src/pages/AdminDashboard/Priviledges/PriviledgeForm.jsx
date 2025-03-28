import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

//project imports

import UseAPI from 'hooks/useAPI';
const availableRoles = ['Admin', 'Doctor', 'Receptionist', 'Patient'];
const availableModules = ['Users', 'Appointments', 'Doctors', 'Priviledges'];

const PriviledgeForm = ({ existingPriviledge, onSubmit }) => {
  // Initial state setup for role and modules
  const [role, setRole] = useState(existingPriviledge?.role || '');
  const [modules, setModules] = useState(
    existingPriviledge?.permissions || [
      { module: '', priviledges: { create: false, read: false, update: false, delete: false } },
    ],
  );
  useEffect(() => {
    if (existingPriviledge) {
      setRole(existingPriviledge.role);

      const formattedModules = existingPriviledge.permissions?.map(({ module, priviledges }) => ({
        module,
        priviledges: {
          create: priviledges.includes('create'),
          read: priviledges.includes('read'),
          update: priviledges.includes('update'),
          delete: priviledges.includes('delete'),
        },
      }));

      setModules(formattedModules);
    }
  }, [existingPriviledge]);

  // Handle changes in text inputs (role)
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle changes for module name
  const handleModuleChange = (index, e) => {
    const newModules = [...modules];
    newModules[index].module = e.target.value;
    setModules(newModules);
  };

  // Handle changes in priviledges (checkboxes)
  const handlePriviledgeChange = (index, priviledge, e) => {
    const newModules = [...modules];
    newModules[index].priviledges[priviledge] = e.target.checked;
    setModules(newModules);
  };

  // Add a new module
  const handleAddModule = () => {
    setModules([
      ...modules,
      { module: '', priviledges: { create: false, read: false, update: false, delete: false } },
    ]);
  };

  // Remove a module
  const handleRemoveModule = (index) => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      role,
      permissions: modules.map((module) => ({
        module: module.module,
        priviledges: Object.keys(module.priviledges).filter((key) => module.priviledges[key]),
      })),
    };
    onSubmit(updatedData);
  };
  const handleReset = () => {
    setRole('');
    setModules([{ module: '', priviledges: { create: false, read: false, update: false, delete: false } }]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {existingPriviledge ? 'Update Priviledge' : 'Create Priviledge'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel size="small">Role</InputLabel>
              <Select size="small" label="Role" value={role} onChange={handleRoleChange} required>
                {availableRoles.map((roleOption) => (
                  <MenuItem key={roleOption} value={roleOption}>
                    {roleOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Dynamic Module Inputs */}
        <Typography variant="h6" sx={{ margin: 2 }}>
          Select Modules and Priviledges:
        </Typography>
        {modules?.map((module, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel size="small">Module</InputLabel>
                  <Select
                    size="small"
                    label="Module"
                    value={module.module}
                    onChange={(e) => handleModuleChange(index, e)}
                    required
                  >
                    {availableModules.map((moduleOption) => (
                      <MenuItem key={moduleOption} value={moduleOption}>
                        {moduleOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                {/* Priviledges Checkboxes for each module */}
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={module.priviledges.create}
                        onChange={(e) => handlePriviledgeChange(index, 'create', e)}
                      />
                    }
                    label="Create"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={module.priviledges.read}
                        onChange={(e) => handlePriviledgeChange(index, 'read', e)}
                      />
                    }
                    label="Read"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={module.priviledges.update}
                        onChange={(e) => handlePriviledgeChange(index, 'update', e)}
                      />
                    }
                    label="Update"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={module.priviledges.delete}
                        onChange={(e) => handlePriviledgeChange(index, 'delete', e)}
                      />
                    }
                    label="Delete"
                  />
                </FormGroup>
              </Grid>
              {/* Button to Remove a Module */}
              <Grid size={{ xs: 4, sm: 2, md: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: 1 }}
                  onClick={() => handleRemoveModule(index)}
                >
                  Remove Module
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}

        {/* Button to Add New Module */}
        <Button variant="outlined" color="primary" sx={{ marginTop: 2 }} onClick={handleAddModule}>
          Add Module
        </Button>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="reset"
            variant="outlined"
            color="inherit"
            sx={{ marginTop: 2, mr: 2 }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            // onClick={handleSubmit}
          >
            {existingPriviledge ? 'Update Priviledge' : 'Submit Priviledge'}
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default PriviledgeForm;
