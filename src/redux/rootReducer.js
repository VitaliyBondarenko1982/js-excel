import {types} from './actionTypes';
import {excelConfig} from '../core/constants';

export function rootReducer(state, action) {
  switch (action.type) {
    case types.TABLE_RESIZE:
      return action.data.type === excelConfig.COL ? {
        ...state,
        colState: {
          ...state.colState,
          [action.data.id]: action.data.value,
        },
      } : {
        ...state,
        rowState: {
          ...state.rowState,
          [action.data.id]: action.data.value,
        },
      };
    default:
      return state;
  }
}
