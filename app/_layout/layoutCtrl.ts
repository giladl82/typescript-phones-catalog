module phonesCat.layout {
    interface ILayout {
        searchBy: string;
        search(): void;
        searchKeyPress($event: any): void;
    }

    class LayoutCtrl implements ILayout {

        searchBy;

        static $inject = ['$location'];

        constructor(private $location: ng.ILocationService) {

        }

        search = function (): void {
            var vm: any = this;

            if (vm.searchBy) {
                vm.$location.url("/catalog/" + vm.searchBy);
            }
        }

        searchKeyPress = function ($event: any): void {
            var vm = this;
            if ($event.keyCode === 13) {
                vm.search();
            }
        }
    }

    angular.module("phonesCat")
        .controller("LayoutCtrl", LayoutCtrl);
} 