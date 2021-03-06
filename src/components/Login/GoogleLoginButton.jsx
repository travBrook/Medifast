import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { storeUser } from "../../actions/authActions";
import GoogleButton from "react-google-button";

const GoogleLoginButton = props => {
  //CReate callback url that points to a component that will handle the access token

  const responseGoogle = response => {
    axios
      .post("http://127.0.0.1:8000/users-api/social/google-oauth2/", response)
      .then(res => {
        console.log(res.data);
        console.log(res.data["username"]);
        props.storeUser(res.data);

        if (res.status === 200) {
          props.history.push("/2fa");
        } else if (res.status === 201) {
          props.history.push("/completeRegistration");
          return true;
        } else {
          //Return error message on login
          this.setState({ errorMsg: "Username and password do not match" });
        }
      });
    //Based on response, we either push to /2fa or complete registration
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="1091955405168-v4i4qp61j8h6vv60cf6t8ivpa9vdt8tr.apps.googleusercontent.com"
      GoogleButton="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      //responseType='code'
      //uxMode='redirect'
      className="loginBtn loginBtn--google"
      prompt="select_account"
      redirectUri="http://localhost:3000/callback/"
    />
  );
};

GoogleLoginButton.propTypes = { storeUser: PropTypes.func.isRequired };
//export default GoogleLoginButton;
export default connect(
  null,
  { storeUser }
)(GoogleLoginButton);
