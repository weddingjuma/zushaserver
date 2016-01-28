(function () {
  'use strict';
  angular
    .module('com.module.rents')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.rents', {
          abstract: true,
          url: '/rents',
          templateUrl: 'modules/rents/views/main.html'
        })
        .state('app.rents.list', {
          url: '',
          templateUrl: 'modules/rents/views/list.html',
          controllerAs: 'ctrl',
          controller: function (rents) {
            this.rents = rents;
          },
          resolve: {
            rents: function (RentsService) {
              return RentsService.getRents();
            }
          }
        })
        .state('app.rents.add', {
          url: '/add',
          templateUrl: 'modules/rents/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, RentsService, rent) {
            this.rent = rent;
            this.formFields = RentsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              RentsService.upsertRent(this.rent).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            rent: function () {
              return {};
            }
          }
        })
        .state('app.rents.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/rents/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, RentsService, rent) {
            console.log(rent);
            this.rent = rent;
            this.formFields = RentsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              RentsService.upsertRent(this.rent).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            rent: function ($stateParams, RentsService) {
              return RentsService.getRents($stateParams.id);
            }
          }
        })
        .state('app.rents.view', {
          url: '/:id',
          templateUrl: 'modules/rents/views/view.html',
          controllerAs: 'ctrl',
          controller: function (rent) {
            this.rent = rent;
          },
          resolve: {
            rent: function ($stateParams, RentsService) {
              return RentsService.getRent($stateParams.id);
            }
          }
        })
        .state('app.rents.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, RentsService, rent) {
          RentsService.deleteRent(rent.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            rent: function ($stateParams, RentsService) {
              return RentsService.getRents($stateParams.id);
            }
          }
        });
    }
  );

})();
