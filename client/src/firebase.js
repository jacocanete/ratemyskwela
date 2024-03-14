// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ratemyuni-6b086.firebaseapp.com",
  projectId: "ratemyuni-6b086",
  storageBucket: "ratemyuni-6b086.appspot.com",
  messagingSenderId: "427297130758",
  appId: "1:427297130758:web:8d3aa30d7a1f0b748f7687"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);