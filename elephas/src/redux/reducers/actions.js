const initialState = {
  actions: [],
  action: {}
}

export default (state = initialState, operation) => {
  switch (operation.type) {
    case 'LOAD_ACTIONS':
      return {
        ...state,
        actions: operation.actions
      }
    case 'VIEW_ACTION':
      return {
        ...state,
        action: operation.action
      }
    case 'RATE_ACTION':
      let action = Object.assign({}, state.action)
      action.rating = 5;
      console.log("Action:", action)
      return {
        ...state,
        action: action
      }
    default:
      return state
  }
}
