function blog ($scope, $http, $location, userService, blogService){
	// $scope.username = userService.getUser().username;
	// $scope.blog = blogService.getBlog();

	$scope.username = 'Sooooophie';
	$scope.blog = { _id: "568d62e0ff77bbf60d66dbca",
					author: "Sooooophie",
					description: "Hello, this is my blog about cats. They are so cute and so fluffy looking. Especially the fuzzy ones.",
					name: "Cats",
					};

	

	// $scope.blogEntries = [];

	$http.get('/api/blog/' + $scope.blog._id)
		.success(function(data) {
			$scope.blogEntries = data;
			console.log($scope.blogEntries);
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.addBlogEntry = function(entry) {
		entry.author = $scope.blog.author;
		entry.blogId = $scope.blog._id;

		$http.post('/api/blog/entry', entry)
			.success(function(data) {
				$scope.blogEntries = data;
			})
			.error(function(data) {
				console.log(data);
			});
	};

	$scope.removeBlogEntry = function(entry) {
		$http.delete('/api/blog/' + entry.blogId + '/entry/' + entry._id)
			.success(function(data) {
				$scope.blogEntries = data;
			})
			.error(function(data){
				console.log(data);
			})
	}

}