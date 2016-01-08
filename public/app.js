var bootcamp = angular.module('bootcamp', ['ngRoute']);
bootcamp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
			templateUrl: 'view/partials/signup.html',
			controller: signup
		}).
		when('/signup', {
			templateUrl: 'view/partials/signup.html',
			controller: signup
		}).
		when('/:username', {
			templateUrl: 'view/partials/dashboard.html',
			controller: dashboard
		}).
		when('/:username*/:blog*', {
			templateUrl:'view/partials/blog.html',
			controller: blog
		}).
		otherwise({
			redirectTo: '/'
		});
}]);

bootcamp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
