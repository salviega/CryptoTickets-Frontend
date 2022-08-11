const walletReducer = (state = [], action) => {
  if (action.type === "walletConect") return state.concat(action.payload);
  return state;
};

export { walletReducer };
