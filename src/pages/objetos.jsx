import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '../context/auth-context';
import Alert from '@mui/material/Alert';
import { useObjectContext } from '../context/objects-context';

const ObjetosEncontrados = () => {
  const { objects, deactivateObject } = useObjectContext();
  const { user } = useAuthContext();
  const [showAlert, editAlert] = useState(false);

  const mappedObjects = objects.map((object) => (
    <Grid item xs={5} md={3} key={object._id}>
      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" src={object.imageBase64} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {object.category}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {object.campus}
          </Typography>
        </CardContent>
        {user ? (
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                user
                  ? deactivateObject({
                      id: object._id,
                      matricula: user.email,
                    })
                  : editAlert(true)
              }
            >
              RECLAMAR
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  ));

  return (
    <>
      <div style={{ margin: 30 }}>
        {showAlert ? (
          <Alert severity="error" style={{ margin: 20 }}>
            Tienes que iniciar sesión para reportar un objeto
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
