(function () {
  'use strict';
  angular
    .module('com.module.complaints')
    .run(function ($rootScope, Complaint, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Complaints'), 'app.complaints.list', 'ion-speakerphone');

      Complaint.find(function (data) {
        $rootScope.addDashboardBox('Complaints', 'bg-red', 'ion-speakerphone', data.length, 'app.complaints.list');
      });

    });

})();
