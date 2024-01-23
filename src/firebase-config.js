import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "authentication-tutorial-1dc2f.firebaseapp.com",
  projectId: "authentication-tutorial-1dc2f",
  storageBucket: "authentication-tutorial-1dc2f.appspot.com",
  messagingSenderId: "391798808022",
  appId: "1:391798808022:web:b07c0a831d84df9a88d877",
  measurementId: "G-2ENF8TS08Z",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
