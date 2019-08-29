let express = require("express");
	mongoose = require ("mongoose");
	bodyParser = require("body-parser");
	app = express();

//express to extract the post request
app.use(express.urlencoded())

//render index page at route "/"
app.get("/", (req, res) => {
	res.render("index.ejs");
});

//create form page
app.get("/form", (req, res) => {
	res.render("form.ejs");
});

//post from form
app.post("/form", (req, res) => {
	let title = req.body.title;
	let content = req.body.content;
	let image = req.body.image;
	res.redirect("/");
})

// initialise port
app.listen(3000, (req, res) => {
		   console.log("server is listening")
});