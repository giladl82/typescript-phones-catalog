module phonesCat.controllers {

    interface ICatalog {
        phones: phonesCat.models.IPhone[];
        selectedPhones: string[];
        catalogTitle: string;
        showBack: boolean;
        showCompareError: boolean;
        order(prop: string, dir: phonesCat.models.enums.sordDirection): void;
        onItemSelect(phone: phonesCat.models.IPhone): void;
        comparePhonse(): void;
        hideCompareError(): void;
    }

    interface ICatalogSearchParams extends ng.route.IRouteParamsService {
        searchby: string
    }

    class CatalogCtrl implements ICatalog {
        phones: phonesCat.models.IPhone[];
        selectedPhones: string[];
        catalogTitle: string;
        showBack: boolean = false;
        showCompareError: boolean = false;
        maxItemsToCompare: number;

        static $inject = ["$location", "$routeParams", 'dataAccessService'];

        constructor(private $location: ng.ILocationService,
            private $routeParams: ICatalogSearchParams,
            private dataAccessService: phonesCat.common.services.DataAccessService) {

            var vm = this;

            vm.phones = new Array<phonesCat.models.IPhone>();
            vm.selectedPhones = new Array<string>();

            vm.showBack = false;

            vm.maxItemsToCompare = 6;
            
            //if url contains query term, then query data by term.
            //else load all items
            if ($routeParams && $routeParams.searchby) {
                vm.dataAccessService.query($routeParams.searchby).then(function (phones: phonesCat.models.IPhone[]): void {
                    vm.phones = phones;
                    vm.showBack = true;
                    vm.catalogTitle = $routeParams.searchby.charAt(0).toUpperCase() + $routeParams.searchby.slice(1);

                    if (vm.phones.length === 1) {
                        vm.$location.url("/details/" + vm.phones[0].id);
                    }
                });
            } else {
                vm.dataAccessService.getAll().then(function (phones: phonesCat.models.IPhone[]): void {
                    vm.phones = phones;
                    vm.catalogTitle = "All";

                    if (vm.phones.length === 1) {
                        vm.$location.url("/details/" + vm.phones[0].id);
                    }
                });
            }
        }

        order(prop: string, dir: phonesCat.models.enums.sordDirection): void {
            var vm = this;

            vm.dataAccessService.sortList(vm.phones, prop, dir).then(function (response: phonesCat.models.IPhone[]): void {
                vm.phones = response;

                console.log(response)
            });
        }

        onItemSelect(phone: phonesCat.models.IPhone): void {
            var vm = this;
            var phoneIndex: number = vm.selectedPhones.indexOf(phone.id);
            

            console.log(phone.checkedForCompare);

            if (phoneIndex < 0) {
                if (vm.selectedPhones.length > vm.maxItemsToCompare - 1) {
                    phone.checkedForCompare = false;
                    vm.showCompareError = true;
                    return;
                }

                vm.selectedPhones.push(phone.id);
            } else {
                phone.checkedForCompare = false;
                vm.selectedPhones.splice(phoneIndex, 1);
            }
        }

        comparePhonse(): void {
            var vm = this;
            var selectedPhonesStr: string;

            if (vm.selectedPhones.length <= vm.maxItemsToCompare) {
                selectedPhonesStr = vm.selectedPhones.join("~");

                vm.$location.url("/compare/" + selectedPhonesStr);
            } else {
                vm.showCompareError = true;
            }
        }

        hideCompareError(): void {
            this.showCompareError = false;
        }
    }

    angular.module("phonesCat")
        .controller("CatalogCtrl", CatalogCtrl);
} 