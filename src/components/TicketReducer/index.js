const walletReducer = (state, action) => {
  switch (action.type) {
    case 'walletConected':
      state = action.payload
      break
    default:
      return state
  }
}

export { walletReducer }
