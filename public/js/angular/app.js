angular.module("guBotApp", ["ngRoute", "ngResource", "ngSanitize", "ngAnimate"])
    .controller("homeController",
    function () {
        var self = this;
        self.title = "Gu Bot";
    });