// Config.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7e9BC0MK4uYgTvF7RX7VXM_LE0HUa5bA",
  authDomain: "imageuploaddb-d99cf.firebaseapp.com",
  projectId: "imageuploaddb-d99cf",
  storageBucket: "imageuploaddb-d99cf.appspot.com",
  messagingSenderId: "631752404062",
  appId: "1:631752404062:web:b6ae1e9183a7cb4c0ed8cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

export { storage };
