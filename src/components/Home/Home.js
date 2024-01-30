// src/components/Home/Home.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../firebase';
import { signIn, setUser } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithGoogle();
      if (userCredential) {
        const { user } = userCredential;

        // Dispatch the SET_USER action with user details
        dispatch(setUser({
          email: user.email,
          name: user.displayName,
          picture: user.photoURL, // Assuming photoURL is used for the profile picture
        }));

        dispatch(signIn()); // Dispatch the SIGN_IN action to set isAuthenticated to true

        // Log success message
        console.log('Login successful:', user.displayName);

        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        console.log('Login failed: UserCredential is undefined');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Your App</h1>
      <button onClick={handleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default Home;
