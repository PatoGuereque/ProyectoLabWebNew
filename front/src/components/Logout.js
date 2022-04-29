import { GoogleLogout } from "react-google-login";

const clientId =
  "349938449398-8ghsv2tgnar1bmsmvqp868fh1n72q1nm.apps.googleusercontent.com";

function Logout() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div id="LoginButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onSuccess={responseGoogle}
      />
    </div>
  );
}

export default Logout;
