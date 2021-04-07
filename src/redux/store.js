import {defaultStyles, excelConfig} from '../core/constants';

export const defaultState = {
  title: excelConfig.DEFAULT_TITLE,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...defaultState,
  ...state,
});

export const normalizeInitialState = (state) => {
  return state ? normalize(state) : defaultState;
};
