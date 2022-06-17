import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import { useUsersContext } from '../context/users-context';
import { useObjectContext } from '../context/objects-context';
import { DataGrid } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';

const Reports = () => {
  const { data: session } = useSession();
  const { objects } = useObjectContext();
  console.log(objects);

  if (!session || (session && session.user.roles != 'admin')) {
    return (
      <Typography variant="h1">
        You are not authorized to access this page
      </Typography>
    );
  }

  const formatObjects = (objects) => {
    return objects.map((object) => {
      return {
        id: object.id,
        category_name: object.category.name,
        location_name: object.location.name,
        user: object.reportingUserId,
        status: object.status,
      };
    });
  };
  //const [ users ] = useState(useUsersContext());
  //console.log(users);

  //const { objects } = useObjectContext();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'category_name', headerName: 'Category', width: 150 },
    { field: 'location_name', headerName: 'Location', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  //onsole.log(objects);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formatObjects(objects)}
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

export default Reports;
