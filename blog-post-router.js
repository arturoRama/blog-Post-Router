const express = require('express');
const router = express.Router();
const {blogList} = require('./blog-post-model');

router.get('/blog-posts', (req,res,next) =>{
	let blogInfo = blogList.get();

	if (blogInfo){
		res.status(200).json({
			message: "Successfully sent all the blogs",
			status : 200,
			post : blogInfo
		});
	}
	else {
		res.status(500).json({
			message : "Internal server error",
			status : 500
		});
		return next();
	}
});

router.get('/blog-posts/:author', (req,res,next) => {
	if(!('author' in req.params)){
		res.status(406).json({
			message : "Missing parameter",
			status : 406
		});
		return next();
	}

	let sAuthor = req.params.author;
	let authorPosts = blogList.getAuthor(sAuthor);

	if (!authorPosts){
		res.status(500).json({
			message :"Internal server error",
			status : 500
		})
	}
	else{
		if (authorPosts == 1){
			res.status(404).json({
				message : `There are no posts from ${sAuthor}`,
				status : 404
			});
			return next();
		}
	}
	res.status(200).json({
		message : `Successsfully found the posts of ${sAuthor}`,
		status :200,
		post : authorPosts
	});
	return next();
	
});

router.post('/blog-posts', (req,res,next) => {
	let requiredFields = ['title','content','author','publishDate'];

	for(let i = 0; i < requiredFields.length; i++){
		let currentField = requiredFields[i];
		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	let nTitle = req.body.title;
	let nContent = req.body.content;
	let nAuthor = req.body.author;
	let nPDate = req.body.publishDate;

	let newEntry = blogList.add(nTitle,nContent,nAuthor,nPDate);

	if (newEntry){
		res.status(201).json({
			message : "Successsfully added the post",
			status: 201,
			post : newEntry
		});
		return next();
	}
	else{
		res.status(500).json({
			message : "Internal server error",
			status : 500
		});
		return next();
	}
	
});

router.delete('/blog-posts/:id', (req,res,next) => {
	if (!('id' in req.params)){
		res.status(406).json({
			message : "Missing parameter",
			status : 406
		});
		return next();
	}

	if (!('id' in req.body)){
		res.status(406).json({
			message : "Missing id in body",
			status : 406
		});
		return next();
	}

	if (req.params.id != req.body.id){
		res.status(404).json({
			message : "Both id's must match",
			status : 404
		});
		return next();
	}

	let delID = req.body.id;

	let deletedPost = blogList.delete(delID);

	if (deletedPost){
		res.status(204).json({
			message : "Post succesfully deleted",
			status : 204
		});
		return next();
	}
	else{
		res.status(404).json({
			message : "The selected id is not associated to any post",
			status : 404
		});
		return next();
	}
});

router.put('/blog-posts/:id', (req,res,next) => {
	if (!('id' in req.params))
	{
		res.status(406).json({
			message : "Missing parameter",
			status : 406
		});
		return next();
	}
	let putID = req.params.id;
	
	if(!(blogList.checkID(putID)))
	{
		res.status(404).json({
			message: "The selected id is not associated to any post",
			status : 404
		});
		return next();
	}

	let bodyID = req.body;

	let modifiedEntry = blogList.place(putID,bodyID);

	if (modifiedEntry == 1)
	{
		res.status(404).json({
			message : "No parameters in the body",
			status : 404
		});
		return next(); 
	}
	if(modifiedEntry){
		res.status(200).json({
			message: "Post modified successfully",
			status : 200,
			post :modifiedEntry
		});
		return next();
	}
});


module.exports = router;