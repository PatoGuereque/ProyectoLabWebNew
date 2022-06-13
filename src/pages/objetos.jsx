import React, { useState } from 'react';
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
import { useEffect } from 'react';

const ObjetosEncontrados = () => {
  const { objects, deactivateObject } = useObjectContext();
  const [showAlert, editAlert] = useState(false);
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

  const [inferiorLimit, superiorLimit] = offset(page, 8);
  const mappedObjects = objects
    .slice(inferiorLimit, superiorLimit)
    .map(
      ({
        id,
        image,
        category: { name: categoryName },
        location: { name: locationName },
      }) => (
        <Grid item xs={5} md={3} key={id}>
          <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" src={image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {categoryName}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {locationName}
              </Typography>
            </CardContent>
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
          </Card>
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
            Tienes que iniciar sesión para reportar un objeto
          </Alert>
        ) : null}

        <Grid container spacing={2}>
          <Filter />
        </Grid>

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
