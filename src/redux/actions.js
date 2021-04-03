import {types} from './actionTypes';

export const tableResize = (data) => ({
  type: types.TABLE_RESIZE,
  data,
});
