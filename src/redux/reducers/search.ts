const pictures = (state = "", action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_SEARCH":
      return action.payload;
    default:
      return state;
  }
};

export default pictures;
