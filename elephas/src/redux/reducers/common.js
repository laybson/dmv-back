const defaultState = {
  appName: '',
  modalMode: false
}

export default (state = defaultState, operation) => {
  switch (operation.type) {
    case 'TOGGLE_MODAL':
      return {
        ...defaultState,
        modalMode: operation.modalMode
      }
    default:
      return state;
  }
}
