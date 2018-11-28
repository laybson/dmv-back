import { ADD_ACTION, GET_ACTIONS, ACTION_LOADING} from '../rActions/types';

const initialState = {
  actions: [],
  action: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ACTIONS:
      return {
        ...state,
        actions: action.payload,
        loading: false
      }
    case ADD_ACTION:
      return {
        ...state,
        actions: [action.payload, ...state.actions]
      }
    default:
      return state;

  }
}
