// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQHDuUXmmdMUrWxr1e0nbC0l3Te5ib1NQ",
  authDomain: "tradezy-76a50.firebaseapp.com",
  projectId: "tradezy-76a50",
  storageBucket: "tradezy-76a50.appspot.com",
  messagingSenderId: "824309593890",
  appId: "1:824309593890:web:02c7a5d8007a4604b2577b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
  app,
  db
}