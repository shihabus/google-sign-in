import React, { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    insertGapiScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insertGapiScript = () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  };

  const initializeGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id:
          "886474662299-pjvv2e3midhh92e51v7hrlgn49mr5mvp.apps.googleusercontent.com",
      });
      console.log("Api inited");

      window.gapi.load("signin2", () => {
        const params = {
          onsuccess: () => {
            console.log("User has finished signing in!");
          },
        };
        window.gapi.signin2.render("loginButton", params);
      });
    });
  };

  return (
    <>
      <h1>Google Login Demo</h1>
      <a id="loginButton">Sign in with Google</a>
    </>
  );
}

export default App;
