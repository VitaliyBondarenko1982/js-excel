export const getStylesState = (stylesState, payload) => {
  payload.ids.forEach((id) => {
    stylesState[id] = {...stylesState[id], ...payload.value};
  });

  return stylesState;
};
