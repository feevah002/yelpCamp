var express = require("express"),
    router = express.Router({mergeParams: true}),
    campground = require("../models/campground"),
    comment = require("../models/comment"),
    User = require("../models/user"),
    middleware = require("../middleware")
    passport = require("passport");
    
    


//create  new commment form
router.get("/new",  middleware.isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, found){
        if(err){console.log(err)}
         else {
            //  console.log(found)
             res.render ("comments/new", {campground: found});
        }
    })

});

//post the new commment 

router.post("/", function(req, res){
    campground.findById(req.params.id, function(err, found){

        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "something went wrong")
                    console.log(err);
                    
                } else {
                    // console.log(found);
                    // console.log();
                      comment.author.id = req.user._id
                      comment.author.username = req.user.username
                      //save comment
                      comment.save();
                      found.comments.push(comment)
                      found.save();
                      console.log(comment)
                      req.flash("success", "succeeefully created a comment")
                      res.redirect("/campgrounds/"+ found._id);
            
                }
            });
        }
    });
});

//edit form
router.get("/:commentId/edit", middleware.checkCommentOwnership, function(req, res){
    campground.findById(req.params.id, function(err, found){

        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            comment.findById(req.params.commentId, function(err, comment){
                if(err){
                    console.log(err);
                    
                } else {
                   res.render("comments/edit",{campground:found, comment:comment})
            
                }
            });
        }
    });
});

//edit logic
router.put("/:commentId", middleware.checkCommentOwnership,function(req, res){
   comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updated){
      if(err){res.redirect("/campgrounds/"+ req.params.id)}
      else{
        res.redirect("/campgrounds/"+ req.params.id)
      }
   })
})

// "/campgrounds/:id/comments"
// delete logic
router.delete("/:commentId", middleware.checkCommentOwnership, function(req,res){
   console.log()
   comment.findByIdAndRemove(req.params.commentId, function(err){
    if(err){
        req.flash("error", "Something went wrong")
        res.redirect("back")
    }
    else{
        req.flash("success", "Comment deleted")
        res.redirect("/campgrounds/"+req.params.id)
    }
   })
})




module.exports = router;