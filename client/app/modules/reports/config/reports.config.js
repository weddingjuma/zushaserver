(function () {
  'use strict';
  angular
    .module('com.module.reports')
  .run(function ($rootScope, Report, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Reports'), 'app.reports.list', 'fa-edit');

      Report.find(function (reports) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Reports'), 'bg-red', 'ion-document-text', reports.length, 'app.reports.list');
      });

    });

})();
