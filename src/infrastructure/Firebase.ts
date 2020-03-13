import * as firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCiWX7XS7bywENkJKxyzKa9BkKTWV3Xsic",
    authDomain: "prueba-hindra.firebaseapp.com",
    databaseURL: "https://prueba-hindra.firebaseio.com",
    projectId: "prueba-hindra",
    storageBucket: "prueba-hindra.appspot.com",
    messagingSenderId: "833531295878",
    appId: "1:833531295878:web:2dcfccd0488e09bec2b907"
};

const Firebase = firebase.initializeApp(firebaseConfig)
export default Firebase