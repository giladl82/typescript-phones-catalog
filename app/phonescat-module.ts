module phonesCat {
    "use strict";

    var app = angular.module("phonesCat", ["ngRoute"]);

    config.$inject = ["$routeProvider"];

    function config($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider.when("/catalog", {
            templateUrl: "/app/catalog/catalog-view.html",
            controller: "CatalogCtrl as vm"
        }).when("/catalog/:searchby", {
            templateUrl: "/app/catalog/catalog-view.html",
            controller: "CatalogCtrl as vm"
        }).when("/details/:id", {
            templateUrl: "/app/details/details-view.html",
            controller: "DetailsCtrl as vm"
        }).when("/compare/:phones", {
            templateUrl: "/app/compare/compare-view.html",
            controller: "CompareCtrl as vm"
        }).otherwise("/catalog");
    }

    app.config(config);
};