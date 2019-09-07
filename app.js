let express = require("express"),
	mongoose = require ("mongoose"),
	bodyParser = require("body-parser"),
	app = express(),
	methodOverride = require("method-override");

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/matts_blog', {useNewUrlParser: true});

//database model setup
let postSchema = new mongoose.Schema({
	title: String,
	content: String,
	image: String,
	caption: String,
	date: { type : Date, default: Date.now }
});

// make Post the model template
let Entry = mongoose.model("Entry", postSchema);

//express to extract the post request
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
//to make sense of the post data
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 

//render index page at route "/"
app.get("/", (req, res) => {
	res.render("index.ejs");
});

//create form page
app.get("/form", (req, res) => {
	res.render("form.ejs");
});

app.get("/posts", (req, res) => {
	Entry.find({}, (err, allEntries) => {
	res.render("posts", {entry: allEntries})
	})
})

//post from form
app.post("/posts", (req, res) => {
	let title = req.body.title;
	let content = req.body.content;
	let image = req.body.image;
	let caption = req.body.caption;
	let newPost = {title: title, content: content, image: image, caption: caption};
	Entry.create(newPost, (err, newlyCreated) => {
		if(err){
		console.log("error")
	} else {
		res.redirect("/posts")
	}
	})
})

app.get("/posts/:id", (req, res) => {
	Entry.findById(req.params.id, function(err, foundEntry){
		res.render("show.ejs", {entry: foundEntry});
		})
	})

//editt, update and destroy
app.get("/posts/:id/edit", (req, res) => {
	Entry.findById(req.params.id, function(err, foundEntry){
		res.render("edit.ejs", {entry: foundEntry});
		})
	})
app.put("/posts/:id", (req, res) => {
	Entry.findByIdAndUpdate(req.params.id, req.body, function(err, foundEntry){
		res.redirect("/posts/" + req.params.id);
		})
	})
app.delete("/posts/:id", (req, res) =>{
	Entry.findByIdAndRemove(req.params.id, function(deletedEntry){
		res.redirect("/posts");
	})
})
// initialise port
app.listen(3000, (req, res) => {
		   console.log("server is listening")
});

