(function () {
  'use strict';
  angular
    .module('com.module.notices')
    .service('NoticesService', function ($state, CoreService, Notice, gettextCatalog) {

      this.getNotices = function () {
        return Notice.find().$promise;
      };

      this.getNotice = function (id) {
        return Notice.findById({
          id: id
        }).$promise;
      };

      this.upsertNotice = function (notice) {
        return Notice.upsert(notice).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Notice saved'),
              gettextCatalog.getString('Your Notice is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Notice '),
              gettextCatalog.getString('This Notice could no be saved: ') + err
            );
          }
        );
      };

      this.deleteNotice = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Notice.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Notice deleted'),
                gettextCatalog.getString('Your notice is deleted!'));
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
          },
          {
            key: 'startDate',
            type: 'timepicker',
            templateOptions: {
              label: gettextCatalog.getString('Start Time')
            }
          },
          {
            key: 'endDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('End Date'),
              required: true
            }
          },
          {
            key: 'endDate',
            type: 'timepicker',
            templateOptions: {
              label: gettextCatalog.getString('End Time')
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
              key: 'author',
              type: 'input',
              templateOptions: {
                label: gettextCatalog.getString('By'),
                required: true
              }
            }
          
        ];
      };

    });

})();
