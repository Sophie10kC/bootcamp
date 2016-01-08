function signup ($scope, $http, $location){

	$scope.login = function(user) {
		$http.get('/api/login/' + user.username)
			.success(function(data) {
				console.log("Log in successful", data);
				if(data.success) {
					$location.path('/' + data.username);
				} else {
					alert('Log in failed');
				}
			})
			.error(function(data) {
				console.log('Log in failed');
			});
	}
}