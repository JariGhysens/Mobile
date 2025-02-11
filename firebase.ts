import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyD-_Jjbd910Z2R9gvHBiMNityXiJmChCQY",
  authDomain: "mobile-examen-opdracht.firebaseapp.com",
  projectId: "mobile-examen-opdracht",
  storageBucket: "mobile-examen-opdracht.firebasestorage.app",
  messagingSenderId: "315472266829",
  appId: "1:315472266829:web:6b308fc24b16e59eb47e04"
};


const app = initializeApp(firebaseConfig);


initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
