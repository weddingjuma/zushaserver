(function () {
  'use strict';
  angular
    .module('com.module.rents')
    .service('RentsService', function ($state, CoreService, Rent, gettextCatalog) {

      this.getRents = function () {
        return Rent.find().$promise;
      };

      this.getRent = function (id) {
        return Rent.findById({
          id: id
        }).$promise;
      };

      this.upsertRent = function (rent) {
        return Rent.upsert(rent).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Rent saved'),
              gettextCatalog.getString('Your Rent is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving Rent '),
              gettextCatalog.getString('This Rent could no be saved: ') + err
            );
          }
        );
      };

      this.deleteRent = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Rent.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Rent deleted'),
                gettextCatalog.getString('Your rent is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting rent'),
                gettextCatalog.getString('Your rent is not deleted! ') + err);
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
            key: 'locations',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Locations'),
              required: true
            }
          },
          {
            key: 'owner',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Owner'),
              required: true
            }
          }
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
