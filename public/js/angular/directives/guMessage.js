angular.module("guBotApp")
	.directive('guMessage',
        function() {
            return {
                restrict: "E",
                scope: {
                    guType: "@",
					guPlaceholder: "@?",
					guContent: "=?",
					guThumbUrl:"@?"
                },
                templateUrl: "partial/messages/instance"
            };
        });