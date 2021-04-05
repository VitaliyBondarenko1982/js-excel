import {storage} from '../core/utils';
import {defaultStyles, storageKeys, excelConfig} from '../core/constants';
import {createStore} from '../core/createStore';
import {rootReducer} from './rootReducer';

export const defaultState = {
  title: excelConfig.DEFAULT_TITLE,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
  ...defaultState,
});

const initialState = normalize(storage(storageKeys.excelState)) || defaultState;

export const store = createStore(
    rootReducer,
    initialState,
);
