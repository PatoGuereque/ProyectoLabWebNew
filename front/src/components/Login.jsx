import React from 'react';
import { Button } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../constants';

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={({ onClick, disabled }) => (
          <Button onClick={onClick} disabled={disabled}>
            Login with google
          </Button>
        )}
      />
    </>
  );
};

export default Login;
