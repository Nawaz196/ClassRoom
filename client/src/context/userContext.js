export const initialState = null;
export const reducer = (state, action) => {
  if (action.type === "SUSER") {
    return action.payload;
  }
  if (action.type === "TUSER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  return state;
};
