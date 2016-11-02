import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import { category, CategoriesActions} from './categories.state.js';

import template from './categories.html';
import './categories.css';

class CategoriesController {
  constructor($ngRedux, CategoriesActions) {
    'ngInject';

    this.store = $ngRedux;
    this.CategoriesActions = CategoriesActions;
  }

  $onInit() {
    //state getter
    this.store.subscribe(() => {
      this.categories = this.store.getState().categories;
      this.currentCategory = this.store.getState().category;
    });
    // state setter
    this.store.dispatch(
      this.CategoriesActions.getCategories());
  }

  onCategorySelected(category) {
    this.store.dispatch(
      this.CategoriesActions.selectCategory(category)
    );
  }

  isCurrentCategory(category) {
    return this.currentCategory &&
      this.currentCategory.id === category.id;
  }
}
CategoriesController.$inject = ['$ngRedux', 'CategoriesActions'];
const CategoriesComponent = {
  template,
  controller: CategoriesController,
  controllerAs: 'categoriesListCtrl'
};

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .factory('CategoriesActions', CategoriesActions)
    .component('categories', CategoriesComponent)
  ;

export { CategoriesModule, CategoriesComponent, CategoriesController } ;