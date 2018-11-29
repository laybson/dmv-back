import { ADD_ACTION, GET_ACTIONS, ACTION_LOADING, DELETE_ACTION} from '../rActions/types';

const initialState = {
  actions: [],
  action: {},
  loading: false
};

export default function(state = initialState, rAction) {
  switch (rAction.type) {
    case ACTION_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ACTIONS:
      return {
        ...state,
        actions: rAction.payload,
        loading: false
      }
    case ADD_ACTION:
      return {
        ...state,
        actions: [rAction.payload, ...state.actions]
      }
    case DELETE_ACTION:
      return {
        ...state,
        actions: state.actions.filter(action => action._id !== rAction.payload._id)
      }
    default:
      return state;

  }
}
