
import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import Store from './app.store';
import { categories, initialCategories} from './components/categories/categories.state.js';


import template from './app.html';
import './app.css';

const store = new Store (categories, initialCategories);

const AppComponent = {
  template
};

let appModule = angular.module('app', [
    CommonModule.name,
    ComponentsModule.name
  ])
  .component('app', AppComponent)
  .value('store', store)
;

export default appModule;