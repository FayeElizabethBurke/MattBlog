let express = require("express"),
	mongoose = require ("mongoose"),
	bodyParser = require("body-parser"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	app = express();


//express to extract the post request
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
//to make sense of the post data
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 

//connect to mongoose
// mongoose.connect('mongodb://localhost:27017/matts_blog', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://FayeBurke:Cuteytn11!@cluster0-l8mai.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true, 
	useCreateIndex: true })
.then(() => {
	   console.log('connected to MongoDB')
	   
});


//database model setup
let postSchema = new mongoose.Schema({
	title: String,
	content: String,
	image: String,
	caption: String,
	date: { type : Date, default: Date.now() }
});

let Entry = mongoose.model("Entry", postSchema);

// ========
// ROUTES
// ========


//create form page
app.get("/form", (req, res) => {
	res.render("form.ejs");
});

app.get("/allposts", (req, res) => {
	Entry.find({}, (err, allEntries) => {
	res.render("allPosts", {entry: allEntries})
	})
})

app.get("/", (req, res) => {
	Entry.find({}, (err, allEntries) => {
	res.render("posts", {entry: allEntries})
	})
})

//post from form
app.post("/", (req, res) => {
	let title = req.body.title;
	let content = req.body.content;
	let image = req.body.image;
	let caption = req.body.caption;
	let date = Date.now();
	let newPost = {title: title, content: content, image: image, caption: caption};
	Entry.create(newPost, (err, newlyCreated) => {
		if(err){
		console.log("error")
	} else {
		res.redirect("/")
	}
	})
})

app.get("/:id", (req, res) => {
	Entry.findById(req.params.id, function(err, foundEntry){
		res.render("show.ejs", {entry: foundEntry});
		})
	})

//edit, update and destroy
app.get("/:id/edit", (req, res) => {
	Entry.findById(req.params.id, function(err, foundEntry){
		res.render("edit.ejs", {entry: foundEntry});
		})
	})
app.put("/:id", (req, res) => {
	Entry.findByIdAndUpdate(req.params.id, req.body, function(err, foundEntry){
		res.redirect("/" + req.params.id);
		})
	})
app.delete("/:id", (req, res) =>{
	Entry.findByIdAndRemove(req.params.id, function(deletedEntry){
		res.redirect("/");
	})
})

//========
// AUTH ROUTES
//========

app.get("/login", (req, res) => {
	res.render("login")
})

app.post("/login", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username == "Matt123" && password == "password"){
		res.redirect("/allposts")
	}
})

// initialise port
app.listen(3000, (req, res) => {
		   console.log("server is listening")
});

