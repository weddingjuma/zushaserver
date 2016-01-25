(function () {
  'use strict';
  angular
    .module('com.module.bills')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.bills', {
          abstract: true,
          url: '/bills',
          templateUrl: 'modules/bills/views/main.html'
        })
        .state('app.bills.list', {
          url: '',
          templateUrl: 'modules/bills/views/list.html',
          controllerAs: 'ctrl',
          controller: function (bills) {
            this.bills = bills;
          },
          resolve: {
            bills: function (BillService) {
              return BillsService.getBills();
            }
          }
        })
        .state('app.bills.add', {
          url: '/add',
          templateUrl: 'modules/bills/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, BillsService, bill) {
            this.bill = bill;
            this.formFields = BillsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              BillsService.upsertBill(this.bill).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            bill: function () {
              return {};
            }
          }
        })
        .state('app.bills.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/bills/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, BillsService, bill) {
            console.log(bill);
            this.bill = bill;
            this.formFields = BillsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              BillsService.upsertBill(this.bill).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            bill: function ($stateParams, BillsService) {
              return BillsService.getBill($stateParams.id);
            }
          }
        })
        .state('app.bills.view', {
          url: '/:id',
          templateUrl: 'modules/bills/views/view.html',
          controllerAs: 'ctrl',
          controller: function (bill) {
            this.bill = bill;
          },
          resolve: {
            bill: function ($stateParams, BillsService) {
              return BillsService.getBill($stateParams.id);
            }
          }
        })
        .state('app.bills.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, BillsService, bill) {
            BillsService.deleteBill(bill.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            bill: function ($stateParams, BillsService) {
              return BillsService.getBill($stateParams.id);
            }
          }
        });
    }
  );

})();
