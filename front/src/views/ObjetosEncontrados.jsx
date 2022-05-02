import React, { useReducer, useEffect, useState } from 'react';
import {
  fetchObjects,
  reducer,
  deactivateObject,
} from '../reducers/found-objects-reducer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../context/auth-context';
import Alert from '@mui/material/Alert';

const ObjetosEncontrados = () => {
  const [state, dispatch] = useReducer(reducer, { objects: undefined });
  const { user } = useAuthContext();
  const [showAlert, editAlert] = useState(false);

  useEffect(() => {
    fetchObjects(dispatch);
    console.log(user);
  }, []);

  console.log(state.objects);
  const objects = state.objects
    ? state.objects.map((object) => {
        return (
          <Card variant="outlined" sx={{ maxWidth: 345 }} key={object.id}>
            <CardMedia component="img" height="140" src={object.imageBase64} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {object.category}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {object.campus}
              </Typography>
              <Typography variant="body" color="text.secondary">
                Fecha de encuentro: {new Date(object.dateFound).toDateString()}
                <br />
                Ubicación: {object.location}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() =>
                  user
                    ? deactivateObject(
                        {
                          id: object._id,
                          matricula: user.email,
                        },
                        dispatch
                      )
                    : editAlert(true)
                }
              >
                REPORTAR
              </Button>
            </CardActions>
          </Card>
        );
      })
    : [];

  return (
    <>
      <div style={{ margin: 30 }}>
        {showAlert ? (
          <Alert severity="error" style={{ margin: 20 }}>
            Tienes que iniciar sesión para reportar un objeto
          </Alert>
        ) : null}
        <Grid container spacing={2}>
          {objects
            ? objects.map((object) => (
                <Grid item xs={5} md={3}>
                  {object}
                </Grid>
              ))
            : []}
        </Grid>
      </div>
    </>
  );
};

export default ObjetosEncontrados;
