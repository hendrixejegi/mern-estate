// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-9fa0d.firebaseapp.com',
  projectId: 'mern-estate-9fa0d',
  storageBucket: 'mern-estate-9fa0d.firebasestorage.app',
  messagingSenderId: '726461137362',
  appId: '1:726461137362:web:c07ce46fd2e541ff69480b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
