import {types} from './actionTypes';

export const tableResize = (data) => ({
  type: types.TABLE_RESIZE,
  payload: data,
});

export const changeText = (data) => ({
  type: types.CHANGE_TEXT,
  payload: data,
});
