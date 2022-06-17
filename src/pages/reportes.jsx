import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import { useUsersContext } from '../context/users-context';
import { useObjectContext } from '../context/objects-context';
import { DataGrid } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Reports = () => {
  const { data: session } = useSession();
  const { objects } = useObjectContext();
  console.log(objects);
  const [modalObject, setModalObject] = useState(undefined);
  const handleModalClose = () => setModalObject(undefined);

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
        user_reported: object.reportingUserId,
        user_claimed: object.claimedById,
        status: object.status,
        image: object.image,
        comments: object.comments,
        campus: object.location.campus.name,
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
    <>
      <Dialog
        open={modalObject !== undefined}
        onClose={handleModalClose}
        maxWidth="md"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>{modalObject?.row.category_name}</DialogTitle>
        <Box
          sx={{
            px: 2,
          }}
        >
          <CardMedia
            component="img"
            height="250"
            src={modalObject?.row.image}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Localizado en: {modalObject?.row.campus},{' '}
            {modalObject?.row.location_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Comentarios: {modalObject?.row.comments}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Creador de publicacion: {modalObject?.row.user_reported}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Dueno del objeto: {modalObject?.row.user_claimed}
          </Typography>
        </Box>

        <DialogActions>
          <Button onClick={handleModalClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={formatObjects(objects)}
          columns={columns}
          pageSize={5}
          onCellClick={(e, value) => {
            console.log(e, value);
            setModalObject(e);
          }}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default Reports;
