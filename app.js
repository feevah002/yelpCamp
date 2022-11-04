var express = require("express"),
    flash = require("connect-flash")
      expressSession = require("express-session"),
      app = require("express")(),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      bodyparser = require("body-parser"),
      mongoose = require("mongoose"),
      campground =   require("./models/campground"),
      comment =   require("./models/comment"),
      User =   require("./models/user"),
      methodOverride = require("method-override")
      seedDB =   require("./seeds");
      //requiring routes
const commentRoutes = require("./routes/comments");
const campgroundsRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

// seedDB();
main().catch(err => console.log(err));

async function main(){
    await mongoose.connect("mongodb://localhost:27017/yelp_camp_v5");
}
 
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSession({
    secret:"what's this whole life about",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser= req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds",campgroundsRoutes)
app.use(indexRoutes)

let PORT = 3000 
// port connection
app.listen(5555, function(){
    console.log("yelpcamp v2 server just started");
    console.log(process.env.PORT)
});
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("yelpcamp v2 server just started");
    
    
// });

