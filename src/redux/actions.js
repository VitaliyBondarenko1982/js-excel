import {types} from './actionTypes';

export const tableResize = (data) => ({
  type: types.TABLE_RESIZE,
  payload: data,
});

export const changeText = (data) => ({
  type: types.CHANGE_TEXT,
  payload: data,
});

export const changeStyles = (data) => ({
  type: types.CHANGE_STYLES,
  payload: data,
});

export const applyStyle = (data) => ({
  type: types.APPLY_STYLE,
  payload: data,
});

export const changeTitle = (data) => ({
  type: types.CHANGE_TITLE,
  payload: data,
});

