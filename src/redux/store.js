import {storage} from '../core/utils';
import {defaultStyles, storageKeys} from '../core/constants';
import {createStore} from '../core/createStore';
import {rootReducer} from './rootReducer';

export const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

const initialState = normalize(storage(storageKeys.excelState)) || defaultState;

export const store = createStore(
    rootReducer,
    initialState,
);
