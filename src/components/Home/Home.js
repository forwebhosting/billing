// src/components/Home/Home.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../../firebase';
import { signIn, setUser } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

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

        // Get user details (IP, location, device) and send an email
        getUserDetailsAndSendEmail(user);

        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        console.log('Login failed: UserCredential is undefined');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const getUserDetailsAndSendEmail = async (user) => {
    // Fetch user details from IPinfo API
    try {
      const response = await fetch('https://ipinfo.io/json?token=ab9e499a944ce8');
      const data = await response.json();

      // Extract user details
      const { ip, city, region, country, org } = data;

      // Construct email parameters
      const emailParams = {
        to_email: user.email,
        user_name: user.displayName,
        user_ip: ip,
        user_location: `${city}, ${region}, ${country}`,
        user_device: `${org}`,
        user_email: user.email,
        user_display_name: user.displayName,
        user_photo_url: user.photoURL,
      };

      // Send an email using emailjs
      emailjs.send('service_6ploqke', 'template_kpykiwg', emailParams, 'WBwcTzKFut9UhpRjq')
        .then((response) => {
          console.log('Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    } catch (error) {
      console.error('Error fetching user details:', error);
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
