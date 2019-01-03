import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth"

const config = {
    apiKey: "AIzaSyDs213rmFbcnYBLRj_BCAqKHVHl1tIoIEg",
    authDomain: "firetest-e0eed.firebaseapp.com",
    projectId: "firetest-e0eed",
    storageBucket: "firetest-e0eed.appspot.com"
};

firebase.initializeApp(config);
export default firebase;

