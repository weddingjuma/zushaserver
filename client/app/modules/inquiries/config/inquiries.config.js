(function () {
  'use strict';
  angular
    .module('com.module.inquiries')
    .run(function ($rootScope, Inquiry, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Inquiries'), 'app.inquiries.list', 'ion-ios-help');

      Inquiry.find(function (data) {
        $rootScope.addDashboardBox('Inquiries', 'bg-yellow', 'ion-ios-help', data.length, 'app.inquiries.list');
      });

    });

})();
