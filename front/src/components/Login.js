import { GoogleLogin } from "react-google-login";

const clientId =
  "349938449398-8ghsv2tgnar1bmsmvqp868fh1n72q1nm.apps.googleusercontent.com";

function Login() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div id="LoginButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
