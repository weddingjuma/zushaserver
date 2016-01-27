(function () {
  'use strict';
  angular
    .module('com.module.inquiries')
    .service('InquiriesService', function ($state, CoreService, Inquiry, gettextCatalog) {

      this.getInquiries = function () {
        return Inquiry.find().$promise;
      };

      this.getInquiry = function (id) {
        return Inquiry.findById({
          id: id
        }).$promise;
      };

      this.upsertInquiry = function (inquiry) {
        return Inquiry.upsert(inquiry).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Inquiry saved'),
              gettextCatalog.getString('Your Inquiry is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Inquiry'),
              gettextCatalog.getString('This Inquiry could no be saved: ') + err
            );
          }
        );
      };

      this.deleteInquiry = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Inquiry.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Inquiry deleted'),
                gettextCatalog.getString('Your Inquiry is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting notice'),
                gettextCatalog.getString('Your notice is not deleted! ') + err);
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
            key: 'title',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title'),
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
            key: 'startDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Start Date'),
              required: true
            }
          }

        ];
      };

    });

})();
