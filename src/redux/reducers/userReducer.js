// src/redux/reducers/userReducer.js
const initialState = {
  email: sessionStorage.getItem('userEmail') || '',
  name: sessionStorage.getItem('userName') || '',
  picture: sessionStorage.getItem('userPicture') || '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      const { email, name, picture } = action.payload;

      // Persist user details in sessionStorage
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userName', name);
      sessionStorage.setItem('userPicture', picture);

      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
