(function () {
  'use strict';
  angular
    .module('com.module.bills')
    .run(function ($rootScope, Bill, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Bills'), 'app.bills.list', 'fa-calendar-o');

      Bill.find(function (data) {
        $rootScope.addDashboardBox('Bills', 'bg-purple', 'ion-calendar', data.length, 'app.bills.list');
      });

    });

})();
