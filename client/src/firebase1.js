import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByQPb1we_iVOdl_RGyU0m7Szd4NgRgYFI",
  authDomain: "commerce-bf933.firebaseapp.com",
  databaseURL: "https://commerce-bf933.firebaseio.com",
  projectId: "commerce-bf933",
  storageBucket: "commerce-bf933.appspot.com",
  messagingSenderId: "247355523842",
  appId: "1:247355523842:web:ddefd8c396315acd99381b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();