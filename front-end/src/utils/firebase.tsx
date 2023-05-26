// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1c8ESdRb2CJ6FEroh0_PtOS5iddjUt6c",
  authDomain: "ahan-s-potfolio.firebaseapp.com",
  projectId: "ahan-s-potfolio",
  storageBucket: "ahan-s-potfolio.appspot.com",
  messagingSenderId: "70423352789",
  appId: "1:70423352789:web:995c624514ccf53804995c",
  measurementId: "G-Q8E1T4QYPG"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);