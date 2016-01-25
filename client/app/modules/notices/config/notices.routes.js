(function () {
  'use strict';
  angular
    .module('com.module.notices')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.notices', {
          abstract: true,
          url: '/notices',
          templateUrl: 'modules/notices/views/main.html'
        })
        .state('app.notices.list', {
          url: '',
          templateUrl: 'modules/notices/views/list.html',
          controllerAs: 'ctrl',
          controller: function (notices) {
            this.notices = notices;
          },
          resolve: {
            notices: function (NoticesService) {
              return NoticesService.getNotices();
            }
          }
        })
        .state('app.notices.add', {
          url: '/add',
          templateUrl: 'modules/notices/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, NoticesService, notice) {
            this.notice = notice;
            this.formFields = NoticesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              NoticesService.upsertNotice(this.notice).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            notice: function () {
              return {};
            }
          }
        })
        .state('app.notices.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/notices/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, NoticesService, notice) {
            console.log(notice);
            this.notice = notice;
            this.formFields = NoticesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              NoticesService.upsertNotice(this.notice).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            notice: function ($stateParams, NoticesService) {
              return NoticesService.getNotice($stateParams.id);
            }
          }
        })
        .state('app.notices.view', {
          url: '/:id',
          templateUrl: 'modules/notices/views/view.html',
          controllerAs: 'ctrl',
          controller: function (notice) {
            this.notice = notice;
          },
          resolve: {
            notice: function ($stateParams, NoticesService) {
              return NoticesService.getNotice($stateParams.id);
            }
          }
        })
        .state('app.notices.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, NoticesService, notice) {
          NoticesService.deleteNotice(notice.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            notice: function ($stateParams, NoticesService) {
              return NoticesService.getNotice($stateParams.id);
            }
          }
        });
    }
  );

})();
