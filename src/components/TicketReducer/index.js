const walletReducer = (state, action) => { 
  switch (action.type) {
    case 'walletConected':
      return state = action.payload;
    default:
      return state
  }
};

export { walletReducer };
