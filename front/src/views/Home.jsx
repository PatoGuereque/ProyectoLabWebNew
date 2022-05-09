import React from 'react';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <div>
      <center>
        <img
          src={process.env.PUBLIC_URL + 'logolocatec.png'}
          alt="Logo Locatec"
        />
        <Typography component="h5" variant="h5" align="center">
          ¡Inicia sesión con tu cuenta ITESM para empezar!
        </Typography>
      </center>
    </div>
  );
}

export default Home;
