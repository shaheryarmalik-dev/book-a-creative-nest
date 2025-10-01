import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA05UePESC19xPXRt8LkfVgUW0GZPAXJZQ",
  authDomain: "book-event-fd35a.firebaseapp.com",
  projectId: "book-event-fd35a",
  storageBucket: "book-event-fd35a.firebasestorage.app",
  messagingSenderId: "82466663991",
  appId: "1:82466663991:web:e29af94ee76ef658ffd9b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
