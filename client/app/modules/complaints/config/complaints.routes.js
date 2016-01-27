(function () {
  'use strict';
  angular
    .module('com.module.complaints')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.complaints', {
          abstract: true,
          url: '/complaints',
          templateUrl: 'modules/complaints/views/main.html'
        })
        .state('app.complaints.list', {
          url: '',
          templateUrl: 'modules/complaints/views/list.html',
          controllerAs: 'ctrl',
          controller: function (complaints) {
            this.complaints = complaints;
          },
          resolve: {
            complaints: function (ComplaintsService) {
              return ComplaintsService.getComplaints();
            }
          }
        })
        .state('app.complaints.add', {
          url: '/add',
          templateUrl: 'modules/complaints/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ComplaintsService, complaint) {
            this.complaint = complaint;
            this.formFields = ComplaintsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ComplaintsService.upsertComplaint(this.complaint).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            complaint: function () {
              return {};
            }
          }
        })
        .state('app.complaints.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/complaints/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, ComplaintsService, complaint) {
            console.log(complaint);
            this.complaint = complaint;
            this.formFields = ComplaintsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              ComplaintsService.upsertComplaint(this.complaint).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            complaint: function ($stateParams, ComplaintsService) {
              return ComplaintsService.getComplaint($stateParams.id);
            }
          }
        })
        .state('app.complaints.view', {
          url: '/:id',
          templateUrl: 'modules/complaints/views/view.html',
          controllerAs: 'ctrl',
          controller: function (complaint) {
            this.complaint = complaint;
          },
          resolve: {
            complaint: function ($stateParams, ComplaintsService) {
              return ComplaintsService.getComplaint($stateParams.id);
            }
          }
        })
        .state('app.complaints.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, ComplaintsService, complaint) {
          ComplaintsService.deleteComplaint(complaint.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            complaint: function ($stateParams, ComplaintsService) {
              return ComplaintsService.getComplaint($stateParams.id);
            }
          }
        });
    }
  );

})();
