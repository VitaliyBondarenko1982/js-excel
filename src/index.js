import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/index.scss';
import {Excel} from './components/excel/excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {storage} from './core/utils';
import {storageKeys} from './core/constants';
import {store} from './redux/store';

store.subscribe((state) => {
  storage(storageKeys.excelState, state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
