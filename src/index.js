import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/index.scss';
import {Router} from './core/routes/Router';
import {DashboardPage} from './Pages/DashbordPage';
import {ExcelPage} from './Pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
