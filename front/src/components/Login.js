import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../constants";

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div id="LoginButton">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
