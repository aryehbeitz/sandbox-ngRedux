class CategoriesModel {
  constructor($q, $rootScope) {
    'ngInject';

    this.$q = $q;
    this.$rootScope = $rootScope;
    this.currentCategory = null;
    this.categories = [
      {"id": 0, "name": "Sci-fi"},
    {"id": 1, "name": "Thriller"},
    {"id": 2, "name": "Comedy"},
    {"id": 3, "name": "Adventure"}
    ];
  }

  getCategories() {
    return this.$q.when(this.categories);
  }

  setCurrentCategory(category) {
    this.currentCategory = category;
    this.$rootScope.$broadcast('onCurrentCategoryUpdated');
  }

  getCurrentCategory() {
    return this.currentCategory;
  }
}

CategoriesModel.$inject = ['$q', '$rootScope']

export default CategoriesModel;