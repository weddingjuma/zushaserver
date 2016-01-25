(function () {
  'use strict';
  angular
    .module('com.module.bungemembers')
    .run(function ($rootScope, Event, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Bungemembers'), 'app.bungemembers.list', 'fa-calendar-o');

      Bungemember.find(function (data) {
        $rootScope.addDashboardBox('Bungemembers', 'bg-purple', 'ion-calendar', data.length, 'app.bungemembers.list');
      });

    });

})();
