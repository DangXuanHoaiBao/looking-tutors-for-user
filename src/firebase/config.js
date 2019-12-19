import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDUFPKGgDkFyniolwao_9ESsgs2bufX_e8",
    authDomain: "looking-tutors-for-user.firebaseapp.com",
    databaseURL: "https://looking-tutors-for-user.firebaseio.com",
    projectId: "looking-tutors-for-user",
    storageBucket: "looking-tutors-for-user.appspot.com",
    messagingSenderId: "513813831393",
    appId: "1:513813831393:web:a45ee62e633ec5790ba1a0",
    measurementId: "G-JN64QN091G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}
