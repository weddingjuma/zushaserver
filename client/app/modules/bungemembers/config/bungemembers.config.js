(function () {
  'use strict';
  angular
    .module('com.module.bungemembers')
    .run(function ($rootScope, Bungemember, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Bungemembers'), 'app.bungemembers.list', 'ion-person-stalker');

      Bungemember.find(function (data) {
        $rootScope.addDashboardBox('Bungemembers', 'bg-red', 'ion-person-stalker', data.length, 'app.bungemembers.list');
      });

    });

})();
