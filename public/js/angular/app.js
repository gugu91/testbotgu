angular.module("guBotApp", ["ngRoute", "ngResource", "ngSanitize", "ngAnimate"])
    .controller("homeController",
    function () {
        var self = this;
        self.title = "Gu Bot";
    })
    .run(
    function ($rootScope, $location, $timeout) {
        //this is important beacause web page is designed dynamically ing ng and mdl needs it
        $rootScope.$on('$viewContentLoaded', function () {
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            });
        });
    });