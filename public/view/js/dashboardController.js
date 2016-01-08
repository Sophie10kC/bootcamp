function dashboard ($scope, $http, $location){
	$scope.username = window.location.href.split('/')[4];

	console.log($scope.username);
	$scope.trash = false;

	$scope.blogs = [];

	$http.get('/api/blogs/' + $scope.username)
		.success(function(data) {
			$scope.blogs = data;
			console.log("Blogs, ", $scope.blogs);
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.addBlog = function(blog){
		blog.username = $scope.username;
		console.log(blog);
		$scope.blogs.push(blog);

		$http.post('/api/blogs', blog)
			.success(function(data) {
				$scope.blogs = data;
				$scope.blog = {};

			})
			.error(function(data) {
				console.log(data);
			});
	}

	$scope.removeBlog = function(id) {
		BootstrapDialog.show({
			type: BootstrapDialog.TYPE_WARNING,
			title: 'Are you sure you want to delete this blog?',
			message: 'Click on [Delete] to proceed. Note: This action cannot be reversed!',
			buttons: [{
				label: 'Delete',
				cssClass: 'btn btn-default',
				action: function(dialog) {
					$http.delete('/api/blogs/' + id + '/' + $scope.username)
						.success(function(data) {
							$scope.blogs = data;
						})
						.error(function(data) {
							console.log(data);
						});

					dialog.close();
				}
			}]
		});					
	}

	$scope.selectBlog = function(blog) {
		console.log(blog);
		$location.path('/' + $scope.username + '/' + blog.name);
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
