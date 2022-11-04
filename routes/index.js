let express = require("express"),
    router = express.Router(),
    campground = require("../models/campground"),
    comment = require("../models/comment"),
    User = require("../models/user"),
    passport = require("passport");
    


router.get("/", function(req, res){
    res.render("landing");
});


// ============
// authentication
//signup form
//============
router.get("/register", (req,res)=>{
    res.render("users/register")
})
//signing up
router.post("/register",(req,res)=>{
    var newUser = new User({username: req.body.username})
    User.register(newUser ,req.body.password, (err,user)=>{
        if(err){
            // console.log(err)
            req.flash("error", err.message
            
            )
            return res.redirect("/register")
        }
        else{
            passport.authenticate("local")(req,res, function(){
                req.flash("success", "Welcome to Yelpcamp"+ user.username+", nice to meet you")
                res.redirect("/campgrounds")
            })
        }
    })
})
//login form
router.get("/login", (req,res)=>{
    res.render("users/login")
})
//handles login logic
router.post("/login",passport.authenticate("local",{
    
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), (req,res)=>{
  
})



//logout
router.get("/logout",(req,res, next)=>{
    req.logout((err)=>{
        if(err){return next(err)}
        else{
            req.flash("success", "Logged you out!")
            res.redirect("/campgrounds")
        }
    })


})




module.exports = router;
