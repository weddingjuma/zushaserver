(function () {
  'use strict';
  angular
    .module('com.module.rents')
    .run(function ($rootScope, Rent, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Rents'), 'app.rents.list', 'ion-ios-home-outline');

      Rent.find(function (data) {
        $rootScope.addDashboardBox('Rents', 'bg-fuchsia', 'ion-ios-home-outline', data.length, 'app.rents.list');
      });

    });

})();
