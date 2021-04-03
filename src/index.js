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

const store = createStore(rootReducer, {
  tableTitle: 'My Table',
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
