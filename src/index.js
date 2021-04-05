import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/index.scss';
import {Excel} from './components/excel/excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {storage, debounce} from './core/utils';
import {storageKeys} from './core/constants';
import {store} from './redux/store';

const stateListener = debounce((state) => {
  console.log('App state:', state);
  storage(storageKeys.excelState, state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
