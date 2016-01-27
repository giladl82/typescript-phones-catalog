module phonesCat.common.services {
    interface IDataAccessService {
        getAll(): ng.IPromise<phonesCat.models.IPhone[]>;
        query(queryStr: string): ng.IPromise<phonesCat.models.IPhone[]>;
        sortList(phones: phonesCat.models.IPhone[], sortBy: string, sortDir: phonesCat.models.enums.sordDirection): ng.IPromise<phonesCat.models.IPhone[]>;
        getSingleItem(id: string): ng.IPromise<phonesCat.models.IPhoneDetails>;
        getItemsToCompare(id: string[]): ng.IPromise<phonesCat.models.IPhoneDetails[]>;
    }

    export class DataAccessService implements IDataAccessService {

        static $inject = ["$http", "$q"];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }


        getAll(): ng.IPromise<phonesCat.models.IPhone[]> {
            var phones: phonesCat.models.IPhone[];

            //set promise to return
            var deferred: ng.IDeferred<phonesCat.models.IPhone[]>;
            deferred = this.$q.defer<phonesCat.models.IPhone[]>()

            this.$http({
                url: "/phones/phones.js",
                method: "GET"
            }).then(function (response: ng.IHttpPromiseCallbackArg<phonesCat.models.IPhone[]>): void {
                deferred.resolve(response.data);
            });

            //return promise
            return deferred.promise;
        }

        query(queryStr: string): ng.IPromise<phonesCat.models.IPhone[]> {
            var phones: phonesCat.models.IPhone[];

            //set promise to return
            var deferred: ng.IDeferred<phonesCat.models.IPhone[]>;
            deferred = this.$q.defer<phonesCat.models.IPhone[]>()

            this.getAll().then(function (response: phonesCat.models.IPhone[]) {
                phones = response;

                var result: phonesCat.models.IPhone[] = phones.filter(function (phn) {
                    return phn.id.toLowerCase().indexOf(queryStr.toLowerCase()) >= 0 ||
                        phn.name.toLowerCase().indexOf(queryStr.toLowerCase()) >= 0 ||
                        phn.snippet.toLowerCase().indexOf(queryStr.toLowerCase()) >= 0
                });


                deferred.resolve(result);
            });

            //return promise
            return deferred.promise;

        }

        sortList(phones: phonesCat.models.IPhone[], sortBy: string, sortDir: phonesCat.models.enums.sordDirection): ng.IPromise<phonesCat.models.IPhone[]> {

            //set promise to return
            var deferred: ng.IDeferred<phonesCat.models.IPhone[]>;
            deferred = this.$q.defer<phonesCat.models.IPhone[]>()

            phones.sort(function (a: phonesCat.models.IPhone, b: phonesCat.models.IPhone): number {
                var trueVal: number = -1;
                var falseVal: number = 1;

                if (sortDir === phonesCat.models.enums.sordDirection.Asc) {
                    trueVal = 1;
                    falseVal = -1;
                }

                if (isNaN(a[sortBy]) || isNaN(b[sortBy])) {
                    return a[sortBy] >= b[sortBy] ? trueVal : falseVal;
                } else {
                    return Number(a[sortBy]) >= Number(b[sortBy]) ? trueVal : falseVal;
                }

            });

            deferred.resolve(phones);

            //return promise
            return deferred.promise;

        }

        getSingleItem(id: string): ng.IPromise<phonesCat.models.IPhoneDetails> {

            //set promise to return
            var deferred: ng.IDeferred<phonesCat.models.IPhoneDetails>;
            deferred = this.$q.defer<phonesCat.models.IPhoneDetails>()

            this.$http({
                url: "/phones/" + id + ".js",
                method: "GET"
            }).then(function (response: ng.IHttpPromiseCallbackArg<phonesCat.models.IPhoneDetails>): void {
                deferred.resolve(response.data);
            });

            //return promise
            return deferred.promise;

        }

        getItemsToCompare(ids: string[]): ng.IPromise<phonesCat.models.IPhoneDetails[]> {
            var vm = this;
            var phones: models.IPhoneDetails[] = new Array<models.IPhoneDetails>();

            //set promise to return
            var deferred: ng.IDeferred<phonesCat.models.IPhoneDetails[]>;
            deferred = this.$q.defer<phonesCat.models.IPhoneDetails[]>()

            ids.forEach(function (value: string, index: number, array: string[]) {
                vm.getSingleItem(value).then(function (phone: models.IPhoneDetails): void {
                    phones.push(phone);

                    //this is to stop the process (this method logic should of been on the server and sync)
                    if (phones.length === ids.length) {
                        deferred.resolve(phones);
                    }
                });

                
            });
            
            //return promise
            return deferred.promise;
        }
    }

    angular.module("phonesCat").service("dataAccessService", DataAccessService);
} 