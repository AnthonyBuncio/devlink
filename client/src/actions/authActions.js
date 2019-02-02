import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, SET_CURRENT_USER} from './types';

// Register new user
export const registerUser = (userData,history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

// Login user & store token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // Get token from response
      const {token} = res.data;
      // Save token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

// Set user info with token
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

// Logout
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header
  setAuthToken(false);
  // Set current user to empty
  dispatch(setCurrentUser({}));
}