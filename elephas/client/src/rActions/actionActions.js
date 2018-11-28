import axios from 'axios';
import { ADD_ACTION, GET_ERRORS, GET_ACTIONS, ACTION_LOADING } from './types';

export const addAction = actionData => dispatch => {
  axios.post('/api/actions', actionData).then(res => dispatch({
    type: ADD_ACTION,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const getPersonaActions = id => dispatch => {
  dispatch(setActionLoading());
  axios.get(`/api/actions/persona/${id}`, id).then(res => dispatch({
    type: GET_ACTIONS,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ACTIONS,
    payload: null
  }));
}

export const setActionLoading = () => {
  return {
    type: ACTION_LOADING
  }
}
