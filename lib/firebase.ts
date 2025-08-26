// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPpGJg4fPxTaIcymMj4SeFtaOteRAoHBU",
  authDomain: "augment-flow.firebaseapp.com",
  projectId: "augment-flow",
  storageBucket: "augment-flow.firebasestorage.app",
  messagingSenderId: "781087431577",
  appId: "1:781087431577:web:e2599e6b193f888739d108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Google Auth Provider for Gmail
export const gmailProvider = new GoogleAuthProvider();
gmailProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');
gmailProvider.addScope('https://www.googleapis.com/auth/gmail.send');
gmailProvider.addScope('https://www.googleapis.com/auth/gmail.compose');
gmailProvider.addScope('https://www.googleapis.com/auth/gmail.modify');
gmailProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline', // Request refresh token
  include_granted_scopes: 'true'
});

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Connect to emulators in development (optional)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Uncomment these lines if you want to use Firebase emulators
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, "localhost", 9199);
}

export default app;
