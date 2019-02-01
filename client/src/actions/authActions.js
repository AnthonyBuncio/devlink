import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {GET_ERRORS} from './types';

export const registerUser = (userData,history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // Get token from response
      const {token} = res.data;
      // Save token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}