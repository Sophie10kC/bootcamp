var User = require('../models/user');
var Blog = require('../models/blog');
var BlogEntry = require('../models/blogEntry');
var fs = require('fs');

module.exports = function(app) {

	app.get('/api/login/:username', function(req, res){
		//check for login in stuff
		var username = req.params.username;
		User.findOne({'username' : username }, function(err, user) {
			if(err) {
				res.send(err);
				console.log(err);
			} else {
				if(user == null){
					User.create({
						username: username
					}, function(err, user) {
						if(err) {
							res.send(err);
							console.log(err);
						} 
					});
				}
				res.json({ 'success' : true,
							'username' : username});
			}
		});
	});


	app.get('/api/logout', function(req, res) {
		//Logout
		res.redirect('/');	
	});

	/*
		BLOG
		====
	*/

	app.get('/api/blogs/:username', function(req, res) {
		//get collection of blog posts from a user
		Blog.find({'author' : req.params.username}, function(err, blogs) {
			if(err) {
				res.send(err);
			} else {
				res.json(blogs);
			}
		})
	});

	app.post('/api/blogs', function(req, res) {
		//create a new blog
		Blog.create({
			name: req.body.name,
			description: req.body.description,
			author: req.body.username
		}, function(err, blog) {
			if(err) {
				res.send(err);
				console.log(err);
			}
		});

		Blog.find({'author' : req.body.username }, function(err, blogs) {
			if(err) {
				res.send(err);
				console.log("Nothing found");
			} else {
				console.log(blogs);
				res.json(blogs);
			}
		});
	});
	

	app.delete('/api/blogs/:blogId/:username', function(req, res) {
		//delete blogs
		Blog.remove({
			_id : req.params.blogId
		}, function(err, blog) {
			if(err) {
				res.send(err);
			}
		});

		Blog.find({'author' : req.params.username }, function(err, blogs) {
			if(err) {
				res.send(err);
				console.log("Nothing found");
			} else {
				console.log(blogs);
				res.json(blogs);
			}
		});
	});


	/*
		ENTRIES
		=======
	*/
	app.get('/api/blog/:username/:blogName', function(req, res) {
		//get blog entries from a specified blog
		BlogEntry.find({ 'blogId' : req.params.blogName, 'author' : req.params.username }, function(err, blogEntries) {
			if(err) {
				console.log("Nothing found");
				res.send(err);
			} else {
				res.json(blogEntries);
			}
		});

	});

	app.post('/api/blog/entry', function(req, res) {
		//post a blog entry

		var imageBuffer = { 'data' : null, 'type' : null };
		if(req.body.image) {
			imageBuffer = decodeBase64Image(req.body.image);
		}
		
		BlogEntry.create({
			title : req.body.title,
			text : req.body.text,
			author : req.body.author,
			img : { data: imageBuffer.data, contentType: imageBuffer.type },
			blogId : req.body.blogName
		}, function(err, entry) {
			if(err) {
				console.log(err);
				// res.send(err);
			}
		});

		BlogEntry.find({ 'blogId' : req.body.blogName, 'author' : req.body.author }, function(err, blogEntries) {
			if(err) {
				console.log("Nothing found");
				res.send(err);
			} else {
				res.json(blogEntries);
			}
		});
	});

	app.delete('/api/blog/:username/:blogId/entry/:entryId', function(req, res) {
		BlogEntry.remove({
			_id : req.params.entryId
		}, function(err, blogEntry) {
			if(err){
				res.send(err);
			}
		});

		BlogEntry.find({ 'blogId' : req.params.blogId, 'author' : req.params.username }, function(err, blogEntries) {
			if(err) {
				console.log("Nothing found");
				res.send(err);
			} else {
				res.json(blogEntries);
			}
		});
	});

	function decodeBase64Image(dataString) {
		response = {};

		response.type = dataString.split(',')[0];
		response.data = dataString.split(',')[1];

		return response;
	}

	//Load the single view file (Angular will handle the rest)
	app.get('*', function(req, res) {
		// res.sendFile('./public/view/index');
	});
}
