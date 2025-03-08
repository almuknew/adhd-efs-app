// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyB4DzqCMUPszed-tdZ9Ogrl-hnUjCx7P1U",
  authDomain: "adhd-efs-app.firebaseapp.com",
  projectId: "adhd-efs-app",
  storageBucket: "adhd-efs-app.firebasestorage.app",
  messagingSenderId: "717351974721",
  appId: "1:717351974721:web:8e82c42c438f27f58d53c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;