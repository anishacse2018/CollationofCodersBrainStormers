import firebase from 'firebase/compat/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8D06tipRhcw70rOgryXBPd_pxy9BCMs8",
  authDomain: "collationcoders.firebaseapp.com",
  databaseURL: "https://collationcoders-default-rtdb.firebaseio.com",
  projectId: "collationcoders",
  storageBucket: "collationcoders.appspot.com",
  messagingSenderId: "69308740911",
  appId: "1:69308740911:web:df561f49ba97edb94a5dda",
  measurementId: "G-0HYWKL1BH8"
};

// Initialize Firebase
//var app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//var db=firebase.initializeApp(firebaseConfig).firestore();
//export {db};
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export {db};