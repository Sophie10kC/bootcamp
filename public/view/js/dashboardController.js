function dashboard ($scope, $http, $location, userService, blogService){
	// $scope.username = userService.getUser().username;
	$scope.username = 'Sooooophie';
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

		$http.post('/api/blogs', blog)
			.success(function(data) {
				$scope.blogs = data;
			})
			.error(function(data) {
				console.log(data);
			});
	}

	$scope.removeBlog = function(id) {
		$http.delete('/api/blogs/' + id + '/' + $scope.username)
			.success(function(data) {
				$scope.blogs = data;
			})
			.error(function(data) {
				console.log(data);
			});
	}

	$scope.selectBlog = function(blog) {
		console.log(blog);
		blogService.setBlog(blog);
		$location.path('/' + $scope.username + '/' + blog.name);
	}
}
