angular.module('guBotApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/",
            {
                redirectTo: "/interviews/all"
            })
            .when("/interviews/all",
            {
                templateUrl: "partial/interviews/index",
                controller: "interviewsController",
                controllerAs: "interviews"
            })
            .otherwise({ redirectTo: "/" });
    });