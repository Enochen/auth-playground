import firebase from "firebase/app";
import "firebase/auth";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain)
  console.log("Make sure you have a correct .env!");

firebase.initializeApp(firebaseConfig);

export default {
  auth: firebase.auth(),
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .catch(function(error) {
        console.log(error);
      });
  },
};
