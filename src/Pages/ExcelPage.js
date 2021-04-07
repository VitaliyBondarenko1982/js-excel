import {Page} from '../core/Page';
import {debounce, storage, storageName} from '../core/utils';
import {normalizeInitialState} from '../redux/store';
import {Excel} from '../components/excel/excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {createStore} from '../core/createStore';
import {rootReducer} from '../redux/rootReducer';

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
