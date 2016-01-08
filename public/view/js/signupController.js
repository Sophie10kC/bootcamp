function signup ($scope, $http, $location){

	$scope.validateUser = function(user) {
		if(user == undefined || user.username.length < 1) {
			BootstrapDialog.show({
				type: BootstrapDialog.TYPE_WARNING,
				title: 'Invalid Username',
				message: 'Please enter a username with more than 1 character',
				buttons: [{
					label: 'Oh.. Okay',
					cssClass: 'btn btn-default',
					action: function(dialog) {
						dialog.close();
					}
				}]
			});		
		}  else if(user.username.split(' ').length > 1) {
			BootstrapDialog.show({
				type: BootstrapDialog.TYPE_WARNING,
				title: 'Invalid Username',
				message: 'You cannot have spaces in your username!',
				buttons: [{
					label: 'Oh.. Okay',
					cssClass: 'btn btn-default',
					action: function(dialog) {
						dialog.close();
					}
				}]
			});	
		} else {
			login(user);
		}
	}

	var login = function(user) {
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