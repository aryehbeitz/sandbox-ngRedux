import angular from 'angular';
import CategoryItemModule from './category-item/category-item';

import { categories, GET_CATEGORIES, category, GET_CURRENT_CATEGORY} from './categories.state.js';

import template from './categories.html';
import './categories.css';

class CategoriesController {
  constructor(CategoriesModel) {
    'ngInject';
  }

  $onInit() {
    this.categories = categories (undefined, {type: GET_CATEGORIES});
  }

  onCategorySelected(currentCategory) {
    this.currentCategory = category (this.currentCategory,
      {type: GET_CURRENT_CATEGORY, payload: currentCategory}
    );
  }

  isCurrentCategory(category) {
    return this.currentCategory &&
      this.currentCategory.id === category.id;
  }
}
CategoriesController.$inject = ['CategoriesModel'];
const CategoriesComponent = {
  template,
  controller: CategoriesController,
  controllerAs: 'categoriesListCtrl'
};

const CategoriesModule = angular.module('categories', [
      CategoryItemModule.name
    ])
    .component('categories', CategoriesComponent)
  ;

export { CategoriesModule, CategoriesComponent, CategoriesController } ;