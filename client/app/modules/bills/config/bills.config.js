(function () {
  'use strict';
  angular
    .module('com.module.bills')
    .run(function ($rootScope, Bill, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Bills'), 'app.bills.list', 'ion-ios-bookmarks-outline');

      Bill.find(function (data) {
        $rootScope.addDashboardBox('Bills', 'bg-purple', 'ion-ios-bookmarks-outline', data.length, 'app.bills.list');
      });

    });

})();
