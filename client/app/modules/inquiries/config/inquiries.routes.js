(function () {
  'use strict';
  angular
    .module('com.module.inquiries')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.inquiries', {
          abstract: true,
          url: '/inquiries',
          templateUrl: 'modules/inquiries/views/main.html'
        })
        .state('app.inquiries.list', {
          url: '',
          templateUrl: 'modules/inquiries/views/list.html',
          controllerAs: 'ctrl',
          controller: function (inquiries) {
            this.inquiries = inquiries;
          },
          resolve: {
            inquiries: function (InquiriesService) {
              return InquiriesService.getInquiries();
            }
          }
        })
        .state('app.inquiries.add', {
          url: '/add',
          templateUrl: 'modules/inquiries/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, InquiriesService, inquiry) {
            this.inquiry = inquiry;
            this.formFields = InquiriesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              InquiriesService.upsertInquiry(this.inquiry).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            inquiry: function () {
              return {};
            }
          }
        })
        .state('app.inquiries.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/inquiries/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, InquiriesService, inquiry) {
            console.log(inquiry);
            this.inquiry = inquiry;
            this.formFields = InquiriesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              InquiriesService.upsertInquiry(this.inquiry).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            inquiry: function ($stateParams, InquiriesService) {
              return InquiriesService.getInquiry($stateParams.id);
            }
          }
        })
        .state('app.inquiries.view', {
          url: '/:id',
          templateUrl: 'modules/inquiries/views/view.html',
          controllerAs: 'ctrl',
          controller: function (inquiry) {
            this.inquiry = inquiry;
          },
          resolve: {
            inquiry: function ($stateParams, InquiriesService) {
              return InquiriesService.getInquiry($stateParams.id);
            }
          }
        })
        .state('app.inquiries.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, InquiriesService, inquiry) {
          InquiriesService.deleteInquiry(inquiry.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            inquiry: function ($stateParams, InquiriesService) {
              return InquiriesService.getInquiry($stateParams.id);
            }
          }
        });
    }
  );

})();
