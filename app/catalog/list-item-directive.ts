module phonesCat.directives {
    function catalogItem(): ng.IDirective {

        function linkFunction(scope: ng.IScope, elem: ng.IAugmentedJQuery): void {
        }

        var directive = <ng.IDirective> {
            restrict: "E",
            replace: true,
            scope: {
                phoneData: "=",
                onSelect: "&"
            },
            templateUrl: "/app/catalog/list-item-directive-tmpl.html",
            link: linkFunction
        }

        return directive;
    }

    angular.module('phonesCat').directive('catalogItem', catalogItem);
} 