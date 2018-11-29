import { DELETE_PERSONA, GET_PERSONA, GET_PERSONAS, PERSONA_LOADING, CLEAR_CURRENT_PERSONA } from '../rActions/types';

const initialState = {
  persona: null,
  personas: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case PERSONA_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PERSONA:
      return {
        ...state,
        persona: action.payload,
        loading: false
      }
    case GET_PERSONAS:
      return {
        ...state,
        personas: action.payload,
        loading: false
      }
    case DELETE_PERSONA:
      return {
        ...state,
        personas: state.persona.personas.filter(persona => persona._id !== action.payload)
      }
    case CLEAR_CURRENT_PERSONA:
      return {
        ...state,
        persona: null
      }
    default:
      return state;
  }
}
