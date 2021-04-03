import {types} from './actionTypes';

export function rootReducer(state, action) {
  switch (action.type) {
    case types.TABLE_RESIZE:
      return {
        ...state,
        colState: {
          ...state.colState,
          [action.data.id]: action.data.value,
        },
      };
    default:
      return state;
  }
}
