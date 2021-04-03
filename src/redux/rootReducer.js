import {types} from './actionTypes';
import {excelConfig} from '../core/constants';

export function rootReducer(state, {type, payload}) {
  console.log({type, payload});
  switch (type) {
    case types.TABLE_RESIZE:
      return payload.type === excelConfig.COL ? {
        ...state,
        colState: {
          ...state.colState,
          [payload.id]: payload.value,
        },
      } : {
        ...state,
        rowState: {
          ...state.rowState,
          [payload.id]: payload.value,
        },
      };
    case types.CHANGE_TEXT:
      return {
        ...state,
        currentText: payload.value,
        dataState: {
          ...state.dataState,
          [payload.id]: payload.value,
        },
      };
    default:
      return state;
  }
}
