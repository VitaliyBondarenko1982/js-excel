import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/index.scss';
import {Excel} from './components/excel/excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {rootReducer} from './redux/rootReducer';
import {createStore} from './core/createStore';
import {storage} from './core/utils';
import {storageKeys} from './core/constants';

const store = createStore(rootReducer, storage(storageKeys.excelState));

store.subscribe((state) => {
  console.log('App State:', state);
  storage(storageKeys.excelState, state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
