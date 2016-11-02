
import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import ngRedux from 'ng-redux';
import { categories, initialCategories} from './components/categories/categories.state.js';


import template from './app.html';
import './app.css';

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(categories, [], [], initialCategories);
};
config.$inject = ['$ngReduxProvider'];

const AppComponent = {
  template
};

let appModule = angular.module('app', [
    CommonModule.name,
    ComponentsModule.name,
    ngRedux
  ])
  .component('app', AppComponent)
  .config(config)
;

export default appModule;