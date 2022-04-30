import React from 'react';
import { Button } from '@mui/material';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../constants';

const Logout = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onSuccess={responseGoogle}
        render={({ onClick, disabled }) => (
          <Button onClick={onClick} disabled={disabled}>
            Logout
          </Button>
        )}
      />
    </>
  );
};

export default Logout;
