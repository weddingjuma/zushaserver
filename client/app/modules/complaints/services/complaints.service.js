(function () {
  'use strict';
  angular
    .module('com.module.complaints')
    .service('ComplaintsService', function ($state, CoreService, Complaint, gettextCatalog) {

      this.getComplaints = function () {
        return Complaint.find().$promise;
      };

      this.getComplaint = function (id) {
        return Complaint.findById({
          id: id
        }).$promise;
      };

      this.upsertComplaint = function (complaint) {
        return Complaint.upsert(complaint).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Complaint Recorded'),
              gettextCatalog.getString('Your Complaint is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Complaint '),
              gettextCatalog.getString('This Complaint could no be saved: ') + err
            );
          }
        );
      };

      this.deleteComplaint = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Complaint.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Complaint deleted'),
                gettextCatalog.getString('Your complaint is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting complaint'),
                gettextCatalog.getString('Your complaint is not deleted! ') + err);
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
            key: 'location',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Location'),
              required: true
            }
            },
            {
              key: 'date',
              type: 'datepicker',
              templateOptions: {
                label: gettextCatalog.getString('Date'),
                required: true
              }
            }

        ];
      };

    });

})();
