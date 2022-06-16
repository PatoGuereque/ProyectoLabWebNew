import React from 'react';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import { useUsersContext } from '../context/users-context';
import { useObjectContext } from '../context/objects-context';
import { DataGrid } from '@mui/x-data-grid';

const Admin = () => {
  //const users = useUsersContext();
  //const { objects } = useObjectContext();
  let users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'd',
      roles: '',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'd',
      roles: 'admin',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'roles', headerName: 'Role', width: 150 },
  ];

  //onsole.log(objects);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        onCellClick={(e) => {
          console.log(e);
        }}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Admin;
