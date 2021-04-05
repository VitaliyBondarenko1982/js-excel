import {types} from './actionTypes';
import {excelConfig} from '../core/constants';
import {getStylesState} from './utilsReducer';

export function rootReducer(state, {type, payload}) {
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
    case types.APPLY_STYLE:
      return {
        ...state,
        stylesState: getStylesState(state.stylesState, payload),
        currentStyles: {...state.currentStyles, ...payload.value},
      };
    case types.CHANGE_STYLES:
      return {
        ...state,
        currentStyles: payload,
      };
    default:
      return state;
  }
}


