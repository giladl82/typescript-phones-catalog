module phonesCat.controllers {
    interface IPhoneDetails {
        phone: models.IPhoneDetails;
        imageIndex: number;
        updateActiveImage(index: number): void;
    }

    interface IDetailsQueryParams {
        id: string;
    }

    class PhoneDetails implements IPhoneDetails {
        phone: models.IPhoneDetails;
        imageIndex: number = 0;

        static $inject = ["$location", "$routeParams", "dataAccessService"];

        constructor(private $location: ng.ILocationService,
            private $routeParams: IDetailsQueryParams,
            private dataAccessService: common.services.DataAccessService) {
            var vm = this;

            dataAccessService.getSingleItem(vm.$routeParams.id).then(function (data) {
                if (data) {
                    vm.phone = data;
                    console.log(vm.phone);
                } else {
                    vm.$location.url("/catalog");
                }
            });
        }

        updateActiveImage(index: number): void {
            this.imageIndex = index;
        }
    }

    angular.module("phonesCat")
        .controller("DetailsCtrl", PhoneDetails);
} 