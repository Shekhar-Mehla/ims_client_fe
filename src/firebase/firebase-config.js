import { initializeApp } from "firebase/app";

import { getAuth,
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  GithubAuthProvider 
} from "firebase/auth";


import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();