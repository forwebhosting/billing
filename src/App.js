// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from './redux/store';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const ProtectedRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/" />;
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Load user details from localStorage when the app starts
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userPicture = localStorage.getItem('userPicture');

    if (userEmail && userName && userPicture) {
      store.dispatch({
        type: 'SET_USER',
        payload: {
          email: userEmail,
          name: userName,
          picture: userPicture,
        },
      });
    }
  }, []);

  useEffect(() => {
    // Check authentication status when the app starts
    if (isAuthenticated) {
      const storedPath = sessionStorage.getItem('redirectPath') || '/dashboard';
      setHasNavigated(true);
      navigate(storedPath, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Function to handle messages from other tabs/windows
    const handleMessage = (event) => {
      if (event.data.isAuthenticated !== undefined) {
        store.dispatch({
          type: event.data.isAuthenticated ? 'SIGN_IN' : 'SIGN_OUT',
        });

        // Redirect to dashboard or profile if authenticated
        if (event.data.isAuthenticated && !hasNavigated) {
          const storedPath = sessionStorage.getItem('redirectPath') || '/dashboard';
          setHasNavigated(true);
          navigate(storedPath, { replace: true });
        }
      } else {
        store.dispatch({
          type: 'SET_USER',
          payload: event.data,
        });

        // Store user details in localStorage
        localStorage.setItem('userEmail', event.data.email || '');
        localStorage.setItem('userName', event.data.name || '');
        localStorage.setItem('userPicture', event.data.picture || '');

        // Check if already navigated
        if (isAuthenticated && !hasNavigated) {
          const storedPath = sessionStorage.getItem('redirectPath') || '/dashboard';
          setHasNavigated(true);
          navigate(storedPath, { replace: true });
        }
      }
    };

    // Set up event listeners for messages from other tabs/windows
    const authChannel = new BroadcastChannel('authChannel');
    const userDetailsChannel = new BroadcastChannel('userDetailsChannel');

    authChannel.addEventListener('message', handleMessage);
    userDetailsChannel.addEventListener('message', handleMessage);

    return () => {
      authChannel.removeEventListener('message', handleMessage);
      userDetailsChannel.removeEventListener('message', handleMessage);
      authChannel.close();
      userDetailsChannel.close();
    };
  }, [isAuthenticated, hasNavigated, navigate]);

  return (
    <div>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} authenticated={isAuthenticated} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} authenticated={isAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;
