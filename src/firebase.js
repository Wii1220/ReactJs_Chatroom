import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAZexlAO9Lk8Rm4xvZbew4u46TbElDWFL4",
    authDomain: "reactjs-practice-859b7.firebaseapp.com",
    databaseURL: "https://reactjs-practice-859b7.firebaseio.com",
    projectId: "reactjs-practice-859b7",
    storageBucket: "reactjs-practice-859b7.appspot.com",
    messagingSenderId: "748437565526"
};
let fire = firebase.initializeApp(config);

export default fire;