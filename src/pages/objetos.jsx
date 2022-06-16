import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { useObjectContext } from '../context/objects-context';

import AppPagination from '../components/AppPagination';
import Filter from '../components/Filter';
import { CardActionArea, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

//Transition Animation Function
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
var openedModal, openedLocation, openedCampus, openedImage, openedComments;
const ObjetosEncontrados = () => {
  const { objects, deactivateObject } = useObjectContext();

  const [showAlert, editAlert] = useState(false);
  //Pagination Objects
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
  const [results, setResults] = useState([]);

  const [inferiorLimit, superiorLimit] = offset(page, 8);
  //Modal Objects
  const [modalOpen, setModal] = useState(false);
  const handleModalOpen = (id) => () => {
    openedModal = id.id;
    openedCampus = objects[openedModal - 1].location.campus.name;
    openedLocation = objects[openedModal - 1].location.name;
    openedImage = objects[openedModal - 1].image;
    openedComments = objects[openedModal - 1].comments;
    setModal(true);
  };
  const handleModalClose = () => setModal(false);
  //Dialog Objects
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  //Reclaim Function
  const reclama = () =>
    user ? deactivateObject({ id: object._id }) : editAlert(true);
  //Card Styles
  const CustomizedCard = styled(Card)`
    transition: all 0.2s ease-in-out;
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
    },
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

  //Map Of Objects
  const numObjectsTotal = objects.filter((obj) => {
    if (!results || results.length === 0) {
      return true;
    }
    let cont = 0;
    results.forEach((result) => {
      if (
        obj.category.name == result?.title ||
        obj.location.name == result?.title
      ) {
        cont += 1;
      }
    }, []);
    return cont == results.length;
    //return obj.category.name == results[0]?.title && obj.location.name == results[1]?.title
  });

  const mappedObjects = numObjectsTotal
    .slice(inferiorLimit, superiorLimit)
    .map(
      ({
        id,
        image,
        comments,
        campus,
        category: { name: categoryName },
        location: { name: locationName },
        status,
      }) => (
        <Grid item xs={6} md={3} key={id}>
          <CustomizedCard variant="outlined" sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleModalOpen({ id })}>
              <CardMedia component="img" height="180" src={image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {categoryName}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {locationName}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" onClick={handleOpen}>
                RECLAMAR
              </Button>
              {status == 'UNCLAIMED' ? (
                <Chip label="Activo" color="primary" />
              ) : status == 'CLAIMED' ? (
                <Chip label="Inactivo" color="warning" />
              ) : (
                <Chip label="En revision" color="success" />
              )}
            </CardActions>
          </CustomizedCard>
        </Grid>
      )
    );

  useEffect(() => {
    getNumberPages(numObjectsTotal);
  }, [objects, mappedObjects, numObjectsTotal]);

  return (
    <>
      <div>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Localizado en: {openedCampus}, {openedLocation}
            </Typography>
            <CardMedia component="img" height="180" src={openedImage} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Comentarios: {openedComments}
            </Typography>
            <br />
            <Button onClick={handleModalClose}>Cerrar</Button>
          </Box>
        </Modal>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'¿Reclamar objeto?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Esta opción marcará el objeto reportado como suyo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              onClick={() => {
                handleClose();
                reclama();
              }}
            >
              Reclamar
            </Button>
          </DialogActions>
        </Dialog>
        <div style={{ margin: 30 }}>
          {showAlert ? (
            <Alert severity="error" style={{ margin: 20 }}>
              Tienes que iniciar sesión para reportar un objeto
            </Alert>
          ) : null}

          <Grid container spacing={2}>
            <Filter results={results} setResults={setResults} />
          </Grid>
          <br />

          <Grid container spacing={2}>
            {mappedObjects}
          </Grid>

          <br />
          <AppPagination setPage={setPage} pageNumber={numberPages} />
        </div>
      </div>
    </>
  );
};

export default ObjetosEncontrados;
