import { useState, useEffect } from 'react';
//mui components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
//project imports
import CustomTable from 'components/Common/CustomTable';
import FormModal from 'components/Common/FormModal';

//api methods
import { getPriviledges, deletePriviledge, getPriviledgeView } from 'api/priviledgesAPIs';
import { format } from 'prettier';

export default function PriviledgesTable() {
  return (
    <>
      {/* <FormModal open={open} onClose={handleClose} title="Add User">
         
          
          </FormModal> 
          */}
      <CustomTable
        columns={columns}
        tableName="Priviledges"
        add="/admin-dashboard/priviledges/add"
        edit="/admin-dashboard/priviledges/edit"
        get={getPriviledges}
        del={deletePriviledge}
        view={getPriviledgeView}
      />
    </>
  );
}
const columns = [
  {
    delete: true,
    id: 'role',
    label: 'Role',
    width: '70',
    formatCell: (params) => <Typography variant="h5">{params.role}</Typography>,
  },
  {
    id: 'permissions',
    label: 'Module  | Priviledes',
    width: '140',
    formatCell: (params) => renderPriviledges(params),
  },
  { id: 'createdAt', label: 'Created At', width: '70' },
];

const renderPriviledges = (row) => {
  return (
    <Box sx={{ border: '1px solid black' }}>
      {row.permissions.map((item, index) => (
        <Grid
          container
          key={index}
          sx={{
            borderBottom: row.permissions.length - 1 === index ? '' : '1px black solid',
            p: 1,
          }}
        >
          <Grid size={{ sm: 3 }} sx={{ borderRight: '1px solid', justifyContent: 'center', display: 'flex' }}>
            <Typography variant="overline" fontWeight="bold">
              {item.module}
            </Typography>
          </Grid>
          {item.priviledges.map((val) => (
            <>
              <Grid key={val} size={{ sm: 2.25 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                {getPermissionLabel(val)}
              </Grid>
            </>
          ))}
        </Grid>
      ))}
    </Box>
  );
};

function getPermissionLabel(val) {
  switch (val) {
    case 'create':
      return (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: 'success.light',
            color: 'white',
            borderRadius: 3,
            fontWeight: 'bold',
            p: 1,
          }}
        >
          Create
        </Typography>
      );
    case 'read':
      return (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: 'primary.light',
            color: 'white',
            borderRadius: 2,
            fontWeight: 'bold',
            p: 1,
          }}
        >
          Read
        </Typography>
      );
    case 'update':
      return (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: 'warning.light',
            color: 'white',
            borderRadius: 2,
            fontWeight: 'bold',
            p: 1,
          }}
        >
          Update
        </Typography>
      );
    case 'delete':
      return (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: 'error.light',
            color: 'white',
            borderRadius: 2,
            fontWeight: 'bold',
            p: 1,
          }}
        >
          Delete
        </Typography>
      );
    default:
      return ''; // Handle unexpected values
  }
}
