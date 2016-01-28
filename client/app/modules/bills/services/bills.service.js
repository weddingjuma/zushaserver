(function () {
  'use strict';
  angular
    .module('com.module.bills')
    .service('BillsService', function ($state, CoreService, Bill, gettextCatalog) {

      this.getBills = function () {
        return Bill.find().$promise;
      };

      this.getBill = function (id) {
        return Bill.findById({
          id: id
        }).$promise;
      };

      this.upsertBill = function (bill) {
        return Bill.upsert(bill).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Bill saved'),
              gettextCatalog.getString('Your Bill is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Bill '),
              gettextCatalog.getString('This Bill could no be saved: ') + err
            );
          }
        );
      };

      this.deleteBill = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Bill.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Bill deleted'),
                gettextCatalog.getString('Your Bill is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Bill'),
                gettextCatalog.getString('Your Bill is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name'),
              required: true
            }
          },
          {
            key: 'content',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Content'),
              required: true
            }
          },
          {
            key: 'refno',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Refno'),
              required: true
            }
          },
          {
            key: 'author',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Author'),
              required: true
            }
          },
          {
            key: 'type',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Type'),
              required: true
            }
          }
        ];
      };

    });

})();
