import React, { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState(false);

  useEffect(() => {
    insertGapiScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insertGapiScript = () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      initializeGoogle();
    };
    document.body.appendChild(script);
  };

  // onGoogleLibraryLoad
  window.onGoogleLibraryLoad = () => {
    console.log("onGoogleLibraryLoad");
  };

  const initializeGoogle = () => {
    window.onload = function () {
      window.google.accounts.id.initialize({
        client_id:
          "1086442865500-8j926vks62lnh7cmcg6rocqi12p39loe.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        native_callback: handleNativeCallBack,
        // auto_select: true,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // continue with another identity provider.
          console.log("continue with another identity provider.");
        }
      });
    };
  };

  const handleCredentialResponse = (credentialResponse) => {
    console.log("credentialResponse", credentialResponse);
    setState(true);
    // credential:ID token
    window.google.accounts.id.storeCredential((cred) => {
      console.log("storeCredential", cred);
    });
  };

  const handleNativeCallBack = (nativeCallbackResponse) => {
    console.log("nativeCallbackResponse", nativeCallbackResponse);
    // credential:ID token
  };

  const onSignOut = () => {
    window.google.accounts.id.disableAutoSelect();
    console.log("Logged Out");
    setState(false);
  };

  return (
    <>
      <div>Google ONE TAP</div>
      {state && (
        <>
          <div>Logged In</div>
          <button onClick={() => onSignOut()}>Sign Out</button>
        </>
      )}
    </>
  );
}

export default App;
