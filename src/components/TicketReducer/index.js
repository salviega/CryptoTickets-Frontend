const walletReducer = (state, action) => {
  switch (action.type) {
    case 'walletConnected':
      return action.payload
    default:
      return state
  }
}

export { walletReducer }
