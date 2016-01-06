function signup ($scope, $http, $location, userService){

	$scope.signup = function(newUser) {

		$http.post('/api/signup', newUser)
			.success(function(data) {
				console.log("Sign up successful!");
				userService.setUser(newUser);
				$location.path('/' + data.username);
			})
			.error(function(data) {
				console.log('Error: ' + data);
				alert('Sign up failed');
			});
		// setData(newUser.username);
	};

	$scope.login = function(user) {
		$http.get('/api/login/' + user.username + '/' + user.password)
			.success(function(data) {
				console.log("Log in successful", data);
				if(data.success) {
					userService.setUser(user);
					$location.path('/' + data.username);
				} else {
					alert('Log in failed');
				}
			})
			.error(function(data) {
				console.log('Log in failed');
			});
	}

	// var setData = function(username) {
	// 	$http.get('/cookie', username)
	// 		.error(function(data) {
	// 			console.log(data);
	// 		});	
	// }
}