
import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import ngRedux from 'ng-redux';
import { categories, category} from './components/categories/categories.state.js';

import { combineReducers } from 'redux';

import template from './app.html';
import './app.css';

const rootReducer = combineReducers({
  categories,
  category
});

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, []);
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