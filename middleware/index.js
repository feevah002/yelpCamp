// all middle ware goes here
var campground = require("../models/campground"),
    comment = require("../models/comment")
middlewareObj ={}
middlewareObj.checkCampgroundOwnership = function (req,res, next){
   //check ownership
  if(req.isAuthenticated()){
      
      campground.findById(req.params.id, function(err, found){
          if(err){res.redirect("back")}
          else{
          //does user own the campgrounds
              if(found.author.id.equals(req.user._id)){
                  next()
              }
              else{
                req.flash("error", "You can't do that")
                res.redirect("back")
              }
          }
      })
  }
  else{
      res.redirect("back")
  }
}
middlewareObj.checkCommentOwnership =  function (req,res, next){
  //check ownership
    if(req.isAuthenticated()){
        
        comment.findById(req.params.commentId, function(err, found){
            if(err){res.redirect("back")}
            else{
            //does user own the campgrounds
                if(found.author.id.equals(req.user._id)){
                    next()
                }
                else{
                req.flash("error", "You can't do that")
                res.redirect("back")
                }
            }
        })
    }
    else{
        res.redirect("back")
    }
}
middlewareObj.isLoggedIn = function  (req,res,next){
  if(req.isAuthenticated()){
      return next()
  }
  req.flash("error", "You need to be logged in to do that")
  res.redirect("/login")
}

module.exports = middlewareObj