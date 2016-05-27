(function () {
  'use strict';
  angular
    .module('com.module.reports')
    .service('ReportsService', function (CoreService, Report, gettextCatalog) {
      this.getReports = function () {
        return Report.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getReport = function (id) {
        return Report.findById({
          id: id
        }).$promise;
      };

      this.upsertReport = function (report) {
        return Report.upsert(report).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Report saved'),
              gettextCatalog.getString('Your report is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving report '),
              gettextCatalog.getString('This report could no be saved: ') + err
            );
          }
        );
      };

      this.deleteReport = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Report.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Report deleted'),
                gettextCatalog.getString('Your report is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting report'),
                gettextCatalog.getString('Your report is not deleted! ') + err);
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
            key: 'image',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Image')
            }
          }
        ];
      };

    });

})();
