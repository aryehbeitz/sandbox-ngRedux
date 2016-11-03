
import 'bootstrap-css-only';
import 'normalize.css';

import angular from 'angular';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

import { categories, category} from './components/categories/categories.state';
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.state';

import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import template from './app.html';
import './app.css';

const rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
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