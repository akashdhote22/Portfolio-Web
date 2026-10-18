import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase console > Project settings > Your apps > Web app se ye values copy karke yahan paste karo.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGs9WmYRY_6v6mHwHSl-P87w4jI5Yk1xo",
  authDomain: "portfolio-55eb9.firebaseapp.com",
  projectId: "portfolio-55eb9",
  storageBucket: "portfolio-55eb9.firebasestorage.app",
  messagingSenderId: "1067146871226",
  appId: "1:1067146871226:web:cc72e57c5f805a20aedd83",
  measurementId: "G-99FM4CWG7L"
};

// Jab tak config paste nahi karte, app sample projects ke saath chalti rahegi.
export const isConfigured = !firebaseConfig.apiKey.startsWith('PASTE');

let app = null;
export let db = null;
export let auth = null;
if (isConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}
