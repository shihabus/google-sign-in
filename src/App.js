import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

const apiKey = "YOUR_API_KEY";
const discoveryDocs = [
  "https://people.googleapis.com/$discovery/rest?version=v1",
];
var clientId =
  "1086442865500-dmepui1f6a652hfjn3pcgukma5lcqkgi.apps.googleusercontent.com";

var scopes = "profile";

function App() {
  var auth2Instance = useRef(null);
  useEffect(() => {
    window.gapi.load("auth2", async function () {
      const googleAuth = await window.gapi.auth2.init({
        client_id:
          "260896681708-o8bddcaipuisksuvb5u805vokq0fg2hc.apps.googleusercontent.com",
      });
      auth2Instance = window.gapi.auth2.getAuthInstance();
      auth2Instance.isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(auth2Instance.isSignedIn.get());
      console.log("googleAuth", auth2Instance);
    });
  }, []);

  const onSignIn = (e) => {
    e.preventDefault();
    auth2Instance.signIn();
  };

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      console.log("Signed In");
      makeApiCall();
    } else {
      console.log("Not signed in");
    }
  }

  function makeApiCall() {
    window.gapi.client.people.people
      .get({
        resourceName: "people/me",
        "requestMask.includeField": "person.names",
      })
      .then(function (resp) {
        console.log("makeApiCall resp", resp);
      });
  }

  return (
    <div className="App">
      <button onClick={onSignIn}>Sign in</button>
    </div>
  );
}

export default App;
