import { useState, useEffect } from 'react';
import CustomTable from 'components/Common/CustomTable';
import FormModal from 'components/Common/FormModal';

const columns = [
  { id: 'role', label: 'Role', width: '70' },
  { id: 'module', label: 'Module', width: '70' },
  { id: 'select', label: 'Select', width: '70' },
  { id: 'update', label: 'Update', width: '' },
  { id: 'delete', label: 'Delete', width: '70' },
  { id: 'insert', label: 'Insert', width: '70' },
];
export default function PriviledgesTable() {
  const [rows, setRows] = useState(null);

  return (
    <>
      {/* <FormModal open={open} onClose={handleClose} title="Add User">
         
          
          </FormModal> 
          */}
      <CustomTable
        // loading={loading}

        // toolbarOptions={options}
        rows={rows}
        columns={columns}
        tableName="User"
        id="userId"
      />
    </>
  );
}
