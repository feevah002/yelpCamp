const { application } = require("express");

const express = require("express"),
    router = express.Router(),
    campground = require("../models/campground"),
    comment = require("../models/comment"),
    User = require("../models/user"),
    middleware = require("../middleware")
    passport = require("passport");
    
//index route.. show all campgrounds
router.get("/", function(req, res){
    //get a campgrounds
    campground.find({}, function(err, allcamp){
        if(err){console.log("something went wrong "+err)}
        else{
             res.render("campgrounds/index", {campgrounds:allcamp, currentUser: req.user});
        }
    });
   
});

//new - show form to create new campground
router.get("/new",  middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
    //get data from form and add to campground array
    // redirect to camp ground arrray
});

//create - add a new camp ground
router.post("/",  function(req, res){
    let image = req.body.name
    let imageurl = req.body.image
    let desc = req.body.description;
    let price =  req.body.price;
    let author = {
        id : req.user._id,
        user: req.user.username   
    } 
    let newcamp = {name: image, image:imageurl, description:desc, author:author, price: price};
    campground.create(newcamp, function(err, newlyCreated){
        if(err){console.log("this is your error "+err);
            
        } else{
            
            res.redirect("/campgrounds/"+newlyCreated._id)}
            // redirect to camp ground arrray}
    });
    //get data from form and add to campground array
  
//create  new commment

});



// show more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
   
    campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){

        console.log(typeof(req.params.id))
        console.log(req.params.id)
        // console.log("-----------")
        // console.log(foundcamp.author)
        if(err){console.log("your error "+ err)}
        else{
            // console.log(foundcamp)
            res.render("campgrounds/show", {campground: foundcamp})}
            // console.log(campground)
    });
    
    //render show template with that campground
  
})


//edit route
// edit form 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        
    campground.findById(req.params.id, function(err, found){
        if(err){res.redirect("/campgrounds")}
        //does user own the campgrounds
            res.render("campgrounds/edit", {campground :found})  
    })  
})
//edit logic
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err){res.redirect("back")}
        else{
            res.redirect("/campgrounds/"+updated._id)
        }
    })
})

// delete route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    campground.findByIdAndRemove(req.params.id, function(err){
       if(err){res.redirect("/campgrounds")}
       else{
        res.redirect("/campgrounds")
       }
    })
})

//middleware



module.exports = router;