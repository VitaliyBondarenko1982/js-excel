import {storage} from '../core/utils';
import {storageKeys} from '../core/constants';
import {createStore} from '../core/createStore';
import {rootReducer} from './rootReducer';

export const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
};

const initialState = storage(storageKeys.excelState) || defaultState;

export const store = createStore(
    rootReducer,
    initialState,
);
