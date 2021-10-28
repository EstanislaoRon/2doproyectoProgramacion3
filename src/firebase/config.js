
import app from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBlyE7xzKpzSy0125cUeVPgzuKrv4DNjAM",
  authDomain: "proyecto-rn-33302.firebaseapp.com",
  projectId: "proyecto-rn-33302",
  storageBucket: "proyecto-rn-33302.appspot.com",
  messagingSenderId: "675797992890",
  appId: "1:675797992890:web:aad050819c363f9a994983"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();