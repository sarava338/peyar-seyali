// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { CONFIGS } from "../config";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: CONFIGS.FIREBASE_API_KEY,
  authDomain: CONFIGS.FIREBASE_AUTH_DOMAIN,
  projectId: CONFIGS.FIREBASE_PROJECT_ID,
  storageBucket: CONFIGS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: CONFIGS.FIREBASE_MESSAGING_SENDER_ID,
  appId: CONFIGS.FIREBASE_APP_ID,
  measurementId: CONFIGS.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
