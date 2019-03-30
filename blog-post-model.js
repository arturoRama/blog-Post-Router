const uuidv4 = require('uuid/v4');


let blogDB=[
				{
					id: uuidv4(),
					title:"Blog 1",
					content:"Content 1",
					author: "Author1",
					publishDate: "12-12-2012"
				},
				{
					id: uuidv4(),
					title:"Blog 2",
					content:"Content 2",
					author: "Author2",
					publishDate: "13-12-2013"
				},
				{
					id: uuidv4(),
					title:"Blog 3",
					content:"Content 3",
					author: "Author1",
					publishDate: "14-12-2014"
				}];


const blogList = {
	get : function(){
		return blogDB;
	},
	checkID : function(searchId){
		let result = false;
		blogDB.forEach(item => {
			if(searchId == item.id)
				result = true;
		});
		return result;
	},
	add : function(nTitle,nContent,nAuthor,nPublishDate){
		let newItem = {
			id : uuidv4(),
			title : nTitle,
			content : nContent,
			author : nAuthor,
			publishDate : nPublishDate
		};
		blogDB.push(newItem);
		return newItem;
	},
	getAuthor : function(autor){
		let authorPost = [];

		blogDB.forEach(item => {
			if (item.author == autor)
				authorPost.push(item);
		});
		if (authorPost.length != 0)
			return authorPost;
		return 1;
	},
	delete : function(delItem){
		let r = false;
		blogDB.forEach(function(item,index){
			if (item.id == delItem){
				blogDB.splice(index,1);
				r = true;
			}
		});
		
		return r;
	},
	place : function(postId, body){
		let bodyFields = false;
		let sendArr = [];
		let result = 0;
		blogDB.forEach(item =>{
			if(item.id == postId)
			{
				if('title' in body){
					bodyFields = true;
					item.title = body.title;
				}
				if('author' in body){
					bodyFields = true;
					item.author = body.author;
				}
				if('content' in body){
					bodyFields = true;
					item.content = body.content;
				}
				if('publishDate' in body){
					bodyFields = true;
					item.publishDate = body.publishDate;
				}
				if(bodyFields){
					sendArr = item;
					result = 1;
				}
				
			}
		});
		if (result == 1){
			return sendArr;
		}
		else{
			return 1;
		}
	}
}

module.exports = {blogList};