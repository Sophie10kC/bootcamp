var User = require('../models/user');
var Blog = require('../models/blog');
var BlogEntry = require('../models/blogEntry');

module.exports = function(app) {

	// app.get('/cookie', function(req, res){
	// 	res.clearCookie('username');
	// 	res.clearCookie('user');

	// 	res.cookie('username', req.body.username).send('cookie is set');
	// });

	// app.get('/api/logout', function(req, res){
	// 	res.clearCookie('username');
	// 	res.send('Cookie deleted');
	// 	res.redirect('/');
	// })

	app.get('/api/login/:username/:password', function(req, res){
		//check for login in stuff
		console.log('Req.body.username: ', req.params.username);
		User.findOne({'username' : req.params.username }, function(err, user) {
			if(err || user == null) {
				res.send(err);
				console.log(err);
			} else {
				console.log(user);
				if(user.password === req.params.password) {
					res.json({ 'success' : true,
								'username' : user.username});
				} else {
					res.json({'success' : false});
				}
			}
		});

	});

	app.post('/api/signup', function(req, res) {
		//creates a new user
		User.create({
			username: req.body.username,
			password: req.body.password
		}, function(err, user) {
			if(err) {
				res.send(err);
				console.log(err);
			}

		User.findOne({'username' : req.body.username }, function(err, user) {
			if(err || user == null) {
				res.send(err);
				console.log(err);
			} else {
				console.log(user);
				res.json(user.username);
			}
		});

		});

	});

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
			if(err || blogs == null) {
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
			if(err || blogs == null) {
				res.send(err);
				console.log("Nothing found");
			} else {
				console.log(blogs);
				res.json(blogs);
			}
		});
	});

	app.get('/api/blog/:blogId', function(req, res) {
		//get blog entries from a specified blog
		BlogEntry.find({ 'blogId' : req.params.blogId}, function(err, blogEntries) {
			if(err || blogEntries < 1) {
				console.log("Nothing found");
				res.send(err);
			} else {
				res.json(blogEntries);
			}
		});

	});

	app.post('/api/blog/entry', function(req, res) {
		//post a blog entry
		BlogEntry.create({
			title : req.body.title,
			text : req.body.text,
			author : req.body.author,
			blogId : req.body.blogId
		}, function(err, entry) {
			if(err) {
				console.log(err);
				res.send(err);
			}
		});

		BlogEntry.find({ 'blogId' : req.body.blogId }, function(err, blogEntries) {
			if(err || blogEntries < 1) {
				console.log("Nothing found");
				res.send(err);
			} else {
				res.json(blogEntries);
			}
		});
	});

	app.delete('/api/blog/:blogId/entry/:entryId', function(req, res) {
		BlogEntry.remove({
			_id : req.params.entryId
		}, function(err, blogEntry) {
			if(err){
				res.send(err);
			}
		});

		BlogEntry.find({ 'blogId' : req.params.blogId }, function(err, blogEntries) {
			if(err || blogEntries < 1) {
				console.log('Nothing found');
				res.send(err);
			} else {
				res.json(blogEntries);
			}
		})
	});


	//Load the single view file (Angular will handle the rest)
	app.get('*', function(req, res) {
		// res.sendFile('./public/view/index');
	});
}




// var data = {
// 	"blogs": [
// 	{
// 		"name": "Cats",
// 		"description": "Meow"	
// 	}, {
// 		"name": "Dogs",
// 		"description": "Woof"
// 	}]
// };

// exports.blogs = function(req, res) {
// 	var blogs = [];
// 	data.blogs.forEach(function (blog, i) {
// 		blogs.push({
// 			id: i,
// 			title: blog.name,
// 			description: blog.description
// 		});
// 	});
// 	res.json({
// 		blogs: blogs
// 	});
// };

// exports.blog = function(req, res) {
// 	var id = req.params.id;
// 	if(id>=0 && id<data.blogs.length) {
// 		res.json({
// 			blog: data.blogs[id]
// 		});
// 	} else {
// 		res.json(false);
// 	}
// };