import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  AppBar,
  CardActionArea,
  Chip,
  Container,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
  Close as CloseIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useObjectContext } from '../context/objects-context';
import AppPagination from '../components/AppPagination';
import Filter from '../components/Filter';
import { usePlaceContext } from '../context/places-context';
import { useCategoryContext } from '../context/categories-context';
import { useSession } from 'next-auth/react';
import DeleteIcon from '@mui/icons-material/Delete';

//Transition Animation Function
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultPageSize = 9;

const offset = (page, pageSize = defaultPageSize) => {
  let inferiorLimit = (page - 1) * pageSize;
  let superiorLimit = inferiorLimit + pageSize;
  return [inferiorLimit, superiorLimit];
};

const ObjetosEncontrados = () => {
  const { data: session } = useSession();
  const { objects, deactivateObject } = useObjectContext();

  // Filter
  const { places } = usePlaceContext();
  const { categories } = useCategoryContext();
  const [locationFilter, setLocationFilter] = useState({});
  const [categoryFilter, setCategoryFilter] = useState({});

  //Pagination Objects
  const [page, setPage] = useState(1);
  const [numberPages, setNumberPages] = useState(10);
  const getNumberPages = (objectsState, pageSize) => {
    const numObjects = objectsState.length;
    setNumberPages(Math.ceil(numObjects / pageSize));
  };

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  let pageSize = 9;
  if (isXl) {
    pageSize = 12;
  } else if (isLg) {
    pageSize = 9;
  } else if (isMd) {
    pageSize = 6;
  } else {
    pageSize = 4;
  }
  const [inferiorLimit, superiorLimit] = offset(page, pageSize);

  //Modal Objects
  const [modalObject, setModalObject] = useState(undefined);
  const handleModalClose = () => setModalObject(undefined);

  //Dialog Objects
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Mobile Filter Objects
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  //Reclaim Function
  const reclama = () => {
    // TODO: Fix
    //deactivateObject({ id: object._id })
  };

  //Card Styles
  const CustomizedCard = styled(Card)`
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.025);
    }
  `;

  const [objectsState, setObjectsState] = useState(objects);

  const filteredObjects = objectsState
    .filter((obj) => {
      if (Object.keys(locationFilter).length === 0) {
        return true;
      }

      return locationFilter[obj.location.name] === true;
    })
    .filter((obj) => {
      if (Object.keys(categoryFilter).length === 0) {
        return true;
      }

      return categoryFilter[obj.category.name] === true;
    });

  //Map Of Objects
  const mappedObjects = filteredObjects
    .slice(inferiorLimit, superiorLimit)
    .map((object) => {
      const {
        id,
        image,
        category: { name: categoryName },
        location: {
          name: locationName,
          campus: { name: campusName },
        },
        status,
      } = object;
      return (
        <Grid item xs={6} md={6} lg={4} xl={3} key={id}>
          <CustomizedCard variant="outlined" sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => setModalObject(object)}>
              <CardMedia component="img" height="180" src={image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {categoryName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Campus: {campusName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ubicación: {locationName}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Stack
                direction="row"
                justifyContent="space-between"
                flexWrap="wrap"
                flex="auto"
              >
                {status == 'UNCLAIMED' ? (
                  <Chip
                    label="Activo"
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ) : status == 'CLAIMED' ? (
                  <Chip
                    label="Inactivo"
                    color="warning"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Chip
                    label="En revision"
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                )}

                <Button
                  size="small"
                  variant="contained"
                  onClick={handleOpen}
                  sx={{ mt: 1 }}
                >
                  RECLAMAR
                </Button>

                {session.user.roles == 'admin' ? (
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => deleteObject(object)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                ) : null}
              </Stack>
            </CardActions>
          </CustomizedCard>
        </Grid>
      );
    });

  const deleteObject = (object) => {
    const filteredOjectsState = objectsState.filter(
      (obj) => obj.id != object.id
    );

    setObjectsState(filteredOjectsState);
    //deactivateObject({ id: object._id })
  };

  useEffect(() => {
    getNumberPages(filteredObjects, pageSize);
  }, [filteredObjects, pageSize]);

  return (
    <>
      <Dialog
        open={modalObject !== undefined}
        onClose={handleModalClose}
        maxWidth="md"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>{modalObject?.category.name}</DialogTitle>
        <Box
          sx={{
            px: 2,
          }}
        >
          <CardMedia component="img" height="250" src={modalObject?.image} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Localizado en: {modalObject?.location.campus.name},{' '}
            {modalObject?.location.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Comentarios: {modalObject?.comments}
          </Typography>
        </Box>

        <DialogActions>
          <Button onClick={handleModalClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
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
      <Dialog
        fullScreen
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileFilterOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filtros
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setMobileFilterOpen(false)}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Filter
          title={'Categorías'}
          options={categories}
          checked={categoryFilter}
          setChecked={setCategoryFilter}
          sx={{
            mb: 2,
          }}
        />

        <Filter
          title={'Ubicaciones'}
          options={places}
          checked={locationFilter}
          setChecked={setLocationFilter}
        />
      </Dialog>
      <Container
        sx={{
          display: {
            xs: 'flex',
            md: 'none',
          },
          pt: 2,
          flexDirection: 'column-reverse',
        }}
      >
        <Button
          startIcon={<FilterIcon />}
          variant="contained"
          onClick={() => setMobileFilterOpen(true)}
        >
          Filtrar
        </Button>
      </Container>
      <Grid container padding={4} spacing={2}>
        <Grid
          item
          md={2}
          xs={12}
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <Typography sx={{ flex: 1, mb: 2 }} variant="h6" component="div">
            Filtros
          </Typography>
          <Filter
            title={'Categorías'}
            options={categories}
            checked={categoryFilter}
            setChecked={setCategoryFilter}
            sx={{
              mb: 2,
            }}
          />

          <Filter
            title={'Ubicaciones'}
            options={places}
            checked={locationFilter}
            setChecked={setLocationFilter}
          />
        </Grid>
        <Grid item md={10}>
          <Grid container spacing={2}>
            {mappedObjects}
          </Grid>

          <br />
        </Grid>
      </Grid>
      <AppPagination setPage={setPage} pageNumber={numberPages} />
    </>
  );
};

export default ObjetosEncontrados;
