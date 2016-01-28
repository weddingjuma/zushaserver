(function () {
  'use strict';
  angular
    .module('com.module.notices')
    .run(function ($rootScope, Notice, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Notices'), 'app.notices.list', 'ion-clipboard');

      Notice.find(function (data) {
        $rootScope.addDashboardBox('Notices', 'bg-teal', 'ion-clipboard', data.length, 'app.notices.list');
      });

    });

})();
