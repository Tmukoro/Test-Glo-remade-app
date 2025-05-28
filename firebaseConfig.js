import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvGAtxqSsUDiJV79JYZrhGtwxITpeYjKU",
    authDomain: "reactproject-6d0eb.firebaseapp.com",
    projectId: "reactproject-6d0eb",
    storageBucket: "reactproject-6d0eb.firebasestorage.app",
    messagingSenderId: "48877359654",
    appId: "1:48877359654:web:5f1b3fec23b0712075cce7",
    measurementId: "G-B2GN79PGJD"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }

  export {firebase};