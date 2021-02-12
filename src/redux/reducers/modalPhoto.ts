const modalPhoto = (state = "", action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_MODAL":
      return action.payload;
    default:
      return state;
  }
};

export default modalPhoto;
