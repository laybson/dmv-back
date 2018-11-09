const initialState = {
  personas: [],
  persona: {}
}

export default (state = initialState, operation) => {
  switch (operation.type) {
    case 'LOAD_PERSONAS':
      return {
        ...state,
        personas: operation.personas
      }
    case 'VIEW_PERSONA':
      return {
        ...state,
        persona: operation.persona
      }
    default:
      return state
  }
}
