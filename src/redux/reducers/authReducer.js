// src/redux/reducers/authReducer.js
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: {
    email: localStorage.getItem('userEmail') || '',
    name: localStorage.getItem('userName') || '',
    picture: localStorage.getItem('userPicture') || '',
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      localStorage.setItem('isAuthenticated', 'true');
      broadcastAuthState(true);
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPicture');
      broadcastAuthState(false);
      return {
        ...state,
        isAuthenticated: false,
        user: {
          email: '',
          name: '',
          picture: '',
        },
      };
    case 'SET_USER':
      localStorage.setItem('userEmail', action.payload.email);
      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userPicture', action.payload.picture);
      broadcastUserDetails(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Function to broadcast authentication state
const broadcastAuthState = (isAuthenticated) => {
  const broadcastChannel = new BroadcastChannel('authChannel');
  broadcastChannel.postMessage({ isAuthenticated });
};

// Function to broadcast user details
const broadcastUserDetails = (user) => {
  const broadcastChannel = new BroadcastChannel('userDetailsChannel');
  broadcastChannel.postMessage(user);
};

export default authReducer;
