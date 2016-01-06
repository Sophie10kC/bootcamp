var bootcamp = angular.module('bootcamp', ['ngRoute']);
bootcamp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
			templateUrl: 'view/partials/signup.html',
			controller: signup
		}).
		when('/login', {
			templateUrl: 'view/partials/login.html',
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

bootcamp.service('userService', function() {
	var user;

	var setUser = function(newUser) {
		user = newUser;
	};

	var getUser = function() {
		return user;
	};

	return {
		setUser: setUser,
		getUser: getUser
	};
});

bootcamp.service('blogService', function() {
	var blog;

	var setBlog = function(viewBlog) {
		blog = viewBlog;
	};

	var getBlog = function() {
		return blog;
	};

	return {
		setBlog: setBlog,
		getBlog: getBlog
	};
});
