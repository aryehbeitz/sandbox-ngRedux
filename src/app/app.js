
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

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import template from './app.html';
import './app.css';

const DevTools =createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
    changePositionKey = 'ctrl-j'
    defaultVisibility = {false}>
      <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

const run = ($ngRedux, $rootScope) => {
  'ngInject';

  const componentDidUpdate = DockMonitor.prototype.componentDidUpdate;

  DockMonitor.prototype.componentDidUpdate = () => {
    $rootScope.$evalAsync();

    if(componentDidUpdate) {
      componentDidUpdate.apply(this, arguments);
    }
  };

  ReactDom.render(<DevTools store={$ngRedux} />, document.getElementById('devTools'));
}
run.$inject = ['$ngRedux', '$rootScope'];

const rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});

const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk], [DevTools.instrument()]);
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
  .run(run)
;

export default appModule;