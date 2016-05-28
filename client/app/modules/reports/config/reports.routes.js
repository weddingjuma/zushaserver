(function () {
  'use strict';
  angular
    .module('com.module.reports')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.reports', {
          abstract: true,
          url: '/reports',
          templateUrl: 'modules/reports/views/main.html'
        })
        .state('app.reports.list', {
          url: '',
          templateUrl: 'modules/reports/views/list.html',
          controllerAs: 'ctrl',
          controller: function (reports) {
            this.reports = reports;
          },
          resolve: {
            reports: [
              'ReportsService',
              function (ReportsService) {
                return ReportsService.getReports();
              }
            ]
          }
        })
        .state('app.reports.add', {
          url: '/add',
          templateUrl: 'modules/reports/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ReportsService, reports) {
            this.reports = reports;
            this.formFields = ReportsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ReportsService.upsertReport(this.reports).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            report: function () {
              return {};
            }
          }
        })
        .state('app.reports.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/reports/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ReportsService, reports) {
            console.log(report);
            this.report = report;
            this.formFields = ReportsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ReportsService.upsertReport(this.report).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            report: function ($stateParams, ReportsService) {
              return ReportsService.getReport($stateParams.id);
            }
          }
        })
        .state('app.reports.view', {
          url: '/:id',
          templateUrl: 'modules/reports/views/view.html',
          controllerAs: 'ctrl',
          controller: function (reports) {
            this.reports = reports;
          },
          resolve: {
            report: function ($stateParams, ReportsService) {
              return ReportsService.getReport($stateParams.id);
            }
          }
        })
        .state('app.reports.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ReportsService, reports) {
            ReportsService.deleteReport(report.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            report: function ($stateParams, ReportsService) {
              return ReportsService.getReport($stateParams.id);
            }
          }
        });
    }
  );

})();
