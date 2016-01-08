function blog ($scope, $http, $location){

	$scope.username = window.location.href.split('/')[4];
	$scope.blogName = window.location.href.split('/')[5];

	$scope.blogEntries = [];
	console.log($scope.blogEntries);

	$http.get('/api/blog/' + $scope.username + '/' + $scope.blogName)
		.success(function(data) {
			$scope.blogEntries = data;
			console.log($scope.blogEntries);
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.addBlogEntry = function(entry) {
		$scope.blogEntries.push(entry);
		entry.author = $scope.username;
		entry.blogName = $scope.blogName;
		console.log(entry);
		$http.post('/api/blog/entry', entry)
			.success(function(data) {
				$scope.blogEntries = data;
				$scope.entry = {};
			})
			.error(function(data) {
				console.log(data);
			});
	};

	$scope.removeBlogEntry = function(entry) {
		BootstrapDialog.show({
			type: BootstrapDialog.TYPE_WARNING,
			title: 'Are you sure you want to delete this entry?',
			message: 'Click on Delete to proceed. Note: This action cannot be reversed!',
			buttons: [{
				label: 'Delete',
				cssClass: 'btn btn-default',
				action: function(dialog) {
					console.log(entry);
					$http.delete('/api/blog/' + entry.author + '/' + entry.blogId + '/entry/' + entry._id)
						.success(function(data) {
							$scope.blogEntries = data;
						})
						.error(function(data){
							console.log(data);
						});
					dialog.close();
				}
			}]
		});	
	}

	$scope.goDashboard = function() {
		$location.path('/' + $scope.username);
	}

	$scope.logout = function() {
		$http.get('/api/logout')
			.success(function(data) {
				$location.path('/');
			})
			.error(function(data) {
				BootstrapDialog.show({
					type: BootstrapDialog.TYPE_DANGER,
					title: 'An error has occured.',
					message: 'Unable to log out. Please try again.',
				});
			})
	}

}