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

const ObjetosEncontrados = () => {
  const { objects, deactivateObject } = useObjectContext();
  const [showAlert, editAlert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      category: { name: categoryName },
      location: { name: locationName },
    }) => (
      <Grid item xs={5} md={3} key={id}>
        <CustomizedCard variant="outlined" sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={handleOpen}>
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
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Localizado en: {locationName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Comentarios: Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                user
                  ? deactivateObject({
                      id: object._id,
                    })
                  : editAlert(true)
              }
            >
              RECLAMAR
            </Button>
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
