(function () {
  'use strict';
  angular
    .module('com.module.notices')
    .run(function ($rootScope, Notice, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Notices'), 'app.notices.list', 'fa-calendar-o');

      Notice.find(function (data) {
        $rootScope.addDashboardBox('Notices', 'bg-purple', 'ion-calendar', data.length, 'app.notices.list');
      });

    });

})();
