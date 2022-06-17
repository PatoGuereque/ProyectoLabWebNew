import React from 'react';
import Typography from '@mui/material/Typography';
import { useUsersContext } from '../context/users-context';
import { DataGrid } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'roles', headerName: 'Role', width: 150 },
];

const giveAdmin = (e, users) => {
  let index = e.tabIndex;
  if (index > -1) {
    if (users && users[index]?.roles == 'admin') {
      users[index].roles = 'user';
    } else if (users) {
      users[index].roles = 'admin';
    }
  }
};

const Admin = () => {
  const { users } = useUsersContext();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        onCellClick={(e) => {
          giveAdmin(e, users);
        }}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

Admin.auth = {
  role: 'admin',
};

export default Admin;
