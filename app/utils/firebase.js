// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSIT8dtVbYrpQ7a0g8MKsx8BArUCXjhO4",
  authDomain: "diploma-bf3ae.firebaseapp.com",
  projectId: "diploma-bf3ae",
  storageBucket: "diploma-bf3ae.appspot.com",
  messagingSenderId: "750406532067",
  appId: "1:750406532067:web:0d0f544d1e8c8c6554fed6"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
