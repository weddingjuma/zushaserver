(function () {
  'use strict';
  angular
    .module('com.module.bungemembers')
    .service('BungemembersService', function ($state, CoreService, Bungemember, gettextCatalog) {

      this.getBungemembers = function () {
        return Bungemember.find().$promise;
      };

      this.getBungemember = function (id) {
        return Bungemember.findById({
          id: id
        }).$promise;
      };

      this.upsertBungemember = function (bungemember) {
        return Bungemember.upsert(bungemember).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Bunge Member saved'),
              gettextCatalog.getString('Your Bunge Member is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving BungeMember '),
              gettextCatalog.getString('This Bunge Member could no be saved: ') + err
            );
          }
        );
      };

      this.deleteBungemember = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Bungemember.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Bunger Member deleted'),
                gettextCatalog.getString('Your Bunger Member is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting Bunger Member'),
                gettextCatalog.getString('Your Bunger Member is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'fullnames',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('FullNames'),
              required: true
            }
          },
          {
            key: 'description',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Description'),
              required: true
            }
          }
        ];
      };

    });

})();
