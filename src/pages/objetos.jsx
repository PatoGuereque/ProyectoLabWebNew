import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useObjectContext } from '../context/objects-context';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Chip } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import AppPagination from '../components/AppPagination';
import Filter from '../components/Filter';
import { useEffect } from 'react';

import { Chip } from '@mui/material';

const ObjetosEncontrados = () => {
  const { objects, deactivateObject } = useObjectContext();
  const [showAlert, editAlert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModal] = useState(false)
  const handleModalOpen = () => setModal(true);
  const handleModalClose = () => setModal(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => setOpen(false);
  const reclama = () => user ? deactivateObject({id: object._id,}) : editAlert(true)
  const [page, setPage] = useState(1);
  const [numberPages, setNumberPages] = useState(10);

  const getNumberPages = (objects, pageSize = 8) => {
    const numObjects = objects.length;
    setNumberPages(Math.ceil(numObjects / pageSize));
  };

  const offset = (page, pageSize = 8) => {
    let inferiorLimit = (page - 1) * pageSize;
    let superiorLimit = inferiorLimit + pageSize;
    return [inferiorLimit, superiorLimit];
  };

  const CustomizedCard = styled(Card)`
    transition: all .2s ease-in-out;

    :hover {
      transform: scale(1.025);
    }
  `;

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [inferiorLimit, superiorLimit] = offset(page, 8);
  const mappedObjects = objects.map(
    ({
      id,
      image,
      comments,
      campus,
      category: { name: categoryName },
      location: { name: locationName },
    }) => (
      <Grid item xs={5} md={3} key={id}>
        <CustomizedCard variant="outlined" sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={handleModalOpen}>
            <CardMedia component="img" height="180" src={image} />
            <CardContent>
              <ThemeProvider theme={theme}>
                <Typography  variant="h4" component="div" align="center">
                  {categoryName}
                </Typography>
              </ThemeProvider>
            </CardContent>
          </CardActionArea>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Localizado en: {campus}, {locationName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Comentarios: {comments}
              </Typography>
            </Box>
          </Modal>
          <CardActions>
            <Button size="small" onClick={handleOpen}>
              RECLAMAR
            </Button>
            <Chip label="Activo" color="primary" variant="outlined" />
            <Chip label="Inactivo" color="warning" variant="outlined" />
            <Chip label="En revision" color="success" variant="outlined" />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"¿Reclamar objeto?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Esta opción marcará el objeto reportado como suyo.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={() => {
                  handleClose();
                  reclama();
                }}>Reclamar</Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </CustomizedCard>
      </Grid>
    )
  );

  useEffect(() => {
      getNumberPages(objects);
    }, [objects]);

  return (
    <>
      <div style={{ margin: 30 }}>
        {showAlert ? (
          <Alert severity="error" style={{ margin: 20 }}>
            Por favor, inicia sesión para poder reportar un objeto.
          </Alert>
        ) : null}

        <Grid container spacing={2}>
          <Filter />
        </Grid>
        <br />

        <Grid container spacing={2}>
          {mappedObjects}
        </Grid>

        <br />
        <AppPagination setPage={setPage} pageNumber={numberPages} />
      </div>
    </>
  );
};

export default ObjetosEncontrados;
