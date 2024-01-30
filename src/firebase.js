// firebase.js
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDKFCS_6u_QkRPEox2o6g3quGWqEXLh6UQ",
    authDomain: "disneyclone-thowfickofficial.firebaseapp.com",
    databaseURL: "https://disneyclone-thowfickofficial-default-rtdb.firebaseio.com",
    projectId: "disneyclone-thowfickofficial",
    storageBucket: "disneyclone-thowfickofficial.appspot.com",
    messagingSenderId: "50901939137",
    appId: "1:50901939137:web:7edba72a7de393754af540",
    measurementId: "G-0EQGHLTC7E",
  };
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }
};

export { signInWithGoogle };
