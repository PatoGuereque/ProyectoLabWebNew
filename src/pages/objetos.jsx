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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  return (
    <>
      <div style={{ margin: 30 }}>
        {showAlert ? (
          <Alert severity="error" style={{ margin: 20 }}>
            Por favor, inicia sesión para poder reportar un objeto.
          </Alert>
        ) : null}
        <Grid container spacing={2}>
          {mappedObjects}
        </Grid>
      </div>
    </>
  );
};

export default ObjetosEncontrados;
