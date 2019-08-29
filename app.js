let express = require("express"),
	mongoose = require ("mongoose"),
	bodyParser = require("body-parser"),
	app = express();

let array =[];
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