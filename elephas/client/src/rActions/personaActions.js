import axios from 'axios';

import { GET_PERSONA, PERSONA_LOADING, CLEAR_CURRENT_PERSONA, GET_PERSONAS, GET_ERRORS } from './types';

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
    history.push('/personas')).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// export const getPersonas = () => dispatch => {
//   dispatch(setPersonaLoading());
//   axios.get('/api/personas/all').then(res => dispatch({
//     type: GET_PERSONAS,
//     payload: res.data
//   })).catch(err => dispatch({
//     type: GET_PERSONAS,
//     payload: null
//   }))
// }

export const getPersonaById = id => dispatch => {
  dispatch(setPersonaLoading());
  axios.get(`/api/personas/${id}`).then(res => dispatch({
    type: GET_PERSONA,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_PERSONA,
    payload: null
  }))
}

export const getPersonas = user => dispatch => {
  dispatch(setPersonaLoading());
  axios.get(`/api/personas/all/${user.id}`, user ).then(res => dispatch({
    type: GET_PERSONAS,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_PERSONAS,
    payload: null
  }))
}

export const deletePersona = (persona, history) => dispatch => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    axios.delete(`/api/personas/${persona._id}`).then(res =>
      history.push(`/personas`)).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
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
