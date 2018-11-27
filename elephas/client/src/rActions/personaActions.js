import axios from 'axios';

import { GET_PERSONA, PERSONA_LOADING, CLEAR_CURRENT_PERSONA, GET_ERRORS } from './types';

// export const getCurrentProfile = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios.get('/api/profile').then(res => dispatch({
//     type: GET_PROFILE,
//     payload: res.data
//   })).catch(err => dispatch({
//     type: GET_PROFILE,
//     payload: {}
//   }))
// }
export const getCurrentPersona = () => dispatch => {
  
}

export const createPersona = (personaData, history) => dispatch => {
  axios.post('api/personas', personaData).then(res =>
    history.push('/dashboard')).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setPersonaLoading = () => {
  return {
    type: PERSONA_LOADING
  }
}

export const clearCurrentPersona = () => {
  return {
    type: CLEAR_CURRENT_PERSONA
  }
}
