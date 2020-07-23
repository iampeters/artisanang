import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyClnDnkXUII3wrEWaRb2WwSIFTasitToQY",
  authDomain: "artisana-cce6a.firebaseapp.com", //"app.artisana.ng" //artisana-cce6a.firebaseapp.com,
  databaseURL: "https://artisana-cce6a.firebaseio.com",
  projectId: "artisana-cce6a",
  storageBucket: "artisana-cce6a.appspot.com",
  messagingSenderId: "103249686034",
  appId: "1:103249686034:web:73b8fb250965aa6a80f2cb",
  measurementId: "G-SLLPFDR6CB"
};
firebase.initializeApp(firebaseConfig)
export default firebase;
export const GoogleAuth = new firebase.auth.GoogleAuthProvider();
export const FacebookAuth = new firebase.auth.FacebookAuthProvider();