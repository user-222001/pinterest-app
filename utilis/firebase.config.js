// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTKlCPu1SphNBdWRFsIG4R1faEkfMzvnM",
  authDomain: "pinterest-app-55d4f.firebaseapp.com",
  projectId: "pinterest-app-55d4f",
  storageBucket: "pinterest-app-55d4f.appspot.com",
  messagingSenderId: "992105391212",
  appId: "1:992105391212:web:f379e90670db663bdfe449",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
