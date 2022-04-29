import { GoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../constants";

const Logout = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div id="LoginButton">
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onSuccess={responseGoogle}
      />
    </div>
  );
};

export default Logout;
