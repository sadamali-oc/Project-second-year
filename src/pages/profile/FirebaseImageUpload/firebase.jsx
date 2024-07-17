import firebase from 'firebase';

const config={
    apiKey: "AIzaSyD7e9BC0MK4uYgTvF7RX7VXM_LE0HUa5bA",
    authDomain: "imageuploaddb-d99cf.firebaseapp.com",
    projectId: "imageuploaddb-d99cf",
    storageBucket: "imageuploaddb-d99cf.appspot.com",
    messagingSenderId: "631752404062",
    appId: "1:631752404062:web:b6ae1e9183a7cb4c0ed8cf"
}

firebase.initializeApp(config)
export default firebase
