(function () {
  'use strict';
  angular
    .module('com.module.bungemembers')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.bungemembers', {
          abstract: true,
          url: '/bungemembers',
          templateUrl: 'modules/bungemembers/views/main.html'
        })
        .state('app.bungemembers.list', {
          url: '',
          templateUrl: 'modules/bungemembers/views/list.html',
          controllerAs: 'ctrl',
          controller: function (events) {
            this.bungemembers = bungemembers;
          },
          resolve: {
            events: function (BungemembersService) {
              return BungemembersService.getBungemembers();
            }
          }
        })
        .state('app.bungemembers.add', {
          url: '/add',
          templateUrl: 'modules/bungemembers/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, EventsService, event) {
            this.bungemember = bungemember;
            this.formFields = BungemembersService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              EventsService.upsertBungemember(this.bungemember).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            bungemember: function () {
              return {};
            }
          }
        })
        .state('app.bungemembers.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/bungemembers/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, BungemembersService, event) {
            console.log(bungemember);
            this.bungemember = bungemember;
            this.formFields = BungemembersService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              EventsService.upsertEvent(this.bungemember).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            event: function ($stateParams, BungemembersService) {
              return BungemembersService.getBungemember($stateParams.id);
            }
          }
        })
        .state('app.bungemembers.view', {
          url: '/:id',
          templateUrl: 'modules/bungemembers/views/view.html',
          controllerAs: 'ctrl',
          controller: function (bungemember) {
            this.bungemember = bungemember;
          },
          resolve: {
            bungemember: function ($stateParams, BungemembersService) {
              return BungemembersService.getBungemember($stateParams.id);
            }
          }
        })
        .state('app.bungemembers.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, EventsService, event) {
            EventsService.deleteEvent(bungemember.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            event: function ($stateParams, EventsService) {
              return EventsService.getBungemember($stateParams.id);
            }
          }
        });
    }
  );

})();
