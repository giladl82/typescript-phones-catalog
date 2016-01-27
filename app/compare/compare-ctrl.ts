module phonesCat.controllers {
    interface ICompare {
        phones: models.IPhoneDetails[];
        phonesIds: string[];
    }

    interface ICompareParams {
        phones: string;
    }

    class CompareCtrl implements ICompare {
        phones: models.IPhoneDetails[];
        phonesIds: string[];

        static $inject = ["$location", "$routeParams", 'dataAccessService'];

        constructor(private $location: ng.ILocationService,
            private $routeParams: ICompareParams,
            private dataAccessService: phonesCat.common.services.DataAccessService) {
            var vm = this;

            if (vm.$routeParams.phones) {
                vm.phonesIds = vm.$routeParams.phones.split("~");

                if (vm.phonesIds.length < 2) {
                    vm.$location.url("/catalog");
                    return;
                }

                dataAccessService.getItemsToCompare(vm.phonesIds).then(function (response: models.IPhoneDetails[]): void {
                    console.log(response);
                    vm.phones = response;
                });

            } else {
                vm.$location.url("/catalog");
                return;
            }

            vm.$routeParams.phones            
        }
    }

    angular.module("phonesCat").controller("CompareCtrl", CompareCtrl);
} 