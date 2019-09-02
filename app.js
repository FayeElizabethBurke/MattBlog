let express = require("express"),
	mongoose = require ("mongoose"),
	bodyParser = require("body-parser"),
	app = express();

let array =[
	        	{title: "title1", content: "content1", image: "https://www.gstatic.com/webp/gallery/3.jpg"}, 
                {title: "title2", content: "content2", image: "https://www.gstatic.com/webp/gallery/4.jpg"}, 
                {title: "title3", content: "content3", image: "https://images.unsplash.com/photo-1558403748-6d8a03390378?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}, 
                {title: "title4", content: "content4", image: "https://pixabay.com/get/52e3d14a4b5ab108f5d084609620367d1c3ed9e04e50744f732e7bd4944fc4_340.jpg"}
];
//express to extract the post request
app.use(express.static(__dirname + '/public'));

//to make sense of the post data
app.use(bodyParser.urlencoded({extended: true}));

//render index page at route "/"
app.get("/", (req, res) => {
	res.render("index.ejs");
});

//create form page
app.get("/form", (req, res) => {
	res.render("form.ejs");
});

app.get("/posts", (req, res) => {
	res.render("posts.ejs", {array :array})
})

//post from form
app.post("/posts", (req, res) => {
	let title = req.body.title;
	let content = req.body.content;
	let image = req.body.image;
	let newPost = {title: title, content: content, image: image};
	array.push(newPost);
	res.redirect("/posts")
})

// initialise port
app.listen(3000, (req, res) => {
		   console.log("server is listening")
});

