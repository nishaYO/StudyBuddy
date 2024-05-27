/*eslint-disable*/
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import axios from "axios";
import { useMutation } from "@apollo/client";
import { getUserInfo } from "../Services/getUserInfo";
import { GOOGLE_SIGN_IN_MUTATION } from "../../graphql/mutations";

const GoogleAuth = ({signedIn,onClose}) => {
  const userMetadata = getUserInfo();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // const [googleSignIn, { loading, error }] = useMutation(GOOGLE_SIGN_UP_MUTATION);
  const [googleSignIn, { loading, error }] = useMutation(
    GOOGLE_SIGN_IN_MUTATION
  );

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log("getting credentials report", credentialResponse);
          const client_id = credentialResponse.clientId;
          const credential = credentialResponse.credential;

          const { data, error } = await googleSignIn({
            variables: {
              input: {
                // name: userMetadata.name,
                // email: formData.email,
                // password: formData.password,
                client_id,
                credential,
                timezone: userMetadata.timezone,
                streakGoal: userMetadata.streakGoal,
                deviceSize: userMetadata.deviceSize,
                userAgent: userMetadata.userAgent,
              },
            },
          });
          console.log("Getting response from correct", data, error);
          if (data && data.googleSignIn && data.googleSignIn.loggedIn) {
            localStorage.setItem("token", data.googleSignIn.token);
            localStorage.setItem(
              "user",
              JSON.stringify(data.googleSignIn.user)
            );
            console.log("Login successful");
            signedIn();
            onClose();
          } else {
            console.error("Login failed1");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
