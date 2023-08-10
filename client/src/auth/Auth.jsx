import React, { useState, useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { signIn } from "../api";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userObject = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(userObject !== null);
  }, []);

  const responseGoogle = async (response) => {
    const userObject = jwt_decode(response.credential);
    await signIn(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    setIsLoggedIn(true);
    window.location.reload();
  };

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {!isLoggedIn ? (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </GoogleOAuthProvider>
      ) : (
        <button onClick={() => handleLogout()}>Logout</button>
      )}
    </>
  );
};

export default Auth;
