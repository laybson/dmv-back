const initialState = {
    user: {},
    isAuth: false,
    profile: {}
}

export default (state = initialState, operation) => {
  switch (operation.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuth: Object.keys(operation.user).length > 0 ? true : false,
        user: operation.user
      }
    case 'ADD_PERSONA':
      let persona = Object.assign({}, state.persona)
      let user = Object.assign({}, state.user)
      user.personas.push(operation.personaId)
      return {
        ...state,
        user: user
      }
    case 'SET_PROFILE':
      return {
        ...state,
        profile: operation.profile
      }
    default:
      return state
  }
}
