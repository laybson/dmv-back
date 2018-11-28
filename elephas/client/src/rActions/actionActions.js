import axios from 'axios';
import { ADD_ACTION, GET_ERRORS } from './types';

export const addAction = actionData => dispatch => {
  axios.post('/api/actions', actionData).then(res => dispatch({
    type: ADD_ACTION,
    payload: res.data
  })).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}
