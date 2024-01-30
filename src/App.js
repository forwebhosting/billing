// src/App.js
import React, { useEffect } from 'react';
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

  // Initialize user details from localStorage on component mount
  useEffect(() => {
    const storedUserDetails = {
      email: localStorage.getItem('userEmail') || '',
      name: localStorage.getItem('userName') || '',
      picture: localStorage.getItem('userPicture') || '',
    };

    // Dispatch the SET_USER action to set user details
    store.dispatch({
      type: 'SET_USER',
      payload: storedUserDetails,
    });
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
    // If authenticated and not already on the dashboard, navigate to the dashboard
    if (isAuthenticated && window.location.pathname !== '/dashboard') {
      navigate('/dashboard', { replace: true }); // Replace the current entry in the navigation history
    }
    // You may want to dispatch an action to refresh the user data here
  }, [isAuthenticated, navigate]);

  // Function to handle messages from other tabs/windows
  const handleMessage = (event) => {
    if (event.data.isAuthenticated !== undefined) {
      store.dispatch({
        type: event.data.isAuthenticated ? 'SIGN_IN' : 'SIGN_OUT',
      });
    } else {
      store.dispatch({
        type: 'SET_USER',
        payload: event.data,
      });
    }
  };

  // Set up event listeners for messages from other tabs/windows
  useEffect(() => {
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
  }, []);

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